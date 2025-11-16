import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const OUT_PATH = path.resolve(process.cwd(), 'src', 'data', 'moreDuasScraped.json');

// Categories to scrape: default 1..38 (adjust via env var CATEGORIES or CLI args)
function parseCategoryIds(arg) {
  if (!arg) return Array.from({ length: 38 }, (_, i) => i + 1);
  const parts = String(arg).split(',').map(s => s.trim()).filter(Boolean);
  const ids = new Set();
  for (const p of parts) {
    if (/^\d+-\d+$/.test(p)) {
      const [a, b] = p.split('-').map(n => Number(n));
      for (let i = a; i <= b; i++) ids.add(i);
    } else if (/^\d+$/.test(p)) ids.add(Number(p));
  }
  return Array.from(ids).sort((x, y) => x - y);
}

const RAW_CATS = process.env.CATEGORIES || process.argv[2] || null;
const CATEGORY_IDS = parseCategoryIds(RAW_CATS);
const DEBUG = process.env.DEBUG === '1' || process.env.DEBUG === 'true' || process.argv.includes('--debug');

// Permission guard: Do not run scraping (downloading/copying external content) unless explicitly allowed.
// Set environment variable `ALLOW_EXTERNAL_COPY=1` or pass `--allow-copy` or `--force` to run.
const ALLOW_COPY = process.env.ALLOW_EXTERNAL_COPY === '1' || process.argv.includes('--allow-copy') || process.argv.includes('--force');
if (!ALLOW_COPY) {
  console.error('\nERROR: Permission required. The scraper will not run unless you explicitly allow copying content from an external site.');
  console.error('Set environment variable `ALLOW_EXTERNAL_COPY=1` or add the `--allow-copy` CLI flag to proceed.');
  console.error('If you don\'t have permission, consider linking to the original content or obtain consent first.');
  process.exit(2);
}

function extractLines(text) {
  return text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function isArabic(line) {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(line);
}

function isBengali(line) {
  return /[\u0980-\u09FF]/.test(line);
}

function isLatin(line) {
  // Latin letters (include basic extended latin for diacritics)
  return /[A-Za-z\u00C0-\u024F]/.test(line);
}

function normalize(line) {
  return line.replace(/\s+/g, ' ').trim();
}

function guessFieldsFromChunk(lines) {
  // lines: array of non-empty strings representing one chunk (one possible dua)
  // strategy: find Arabic contiguous block, Bengali line, and a likely transliteration (Latin)
  const result = { arabic: '', transliteration: '', bengali: '' };

  // collect indices
  const arabicIdx = [];
  let bengaliIdx = -1;
  let latinIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (isArabic(l)) arabicIdx.push(i);
    else if (isBengali(l) && bengaliIdx === -1) bengaliIdx = i;
    else if (isLatin(l) && latinIdx === -1) latinIdx = i;
  }

  if (arabicIdx.length) {
    // group consecutive arabic lines as the Arabic text
    let grouped = [lines[arabicIdx[0]]];
    for (let k = 1; k < arabicIdx.length; k++) {
      if (arabicIdx[k] === arabicIdx[k - 1] + 1) grouped.push(lines[arabicIdx[k]]);
    }
    result.arabic = normalize(grouped.join(' '));

    // transliteration likely follows the Arabic block, try after last arabic line
    const after = arabicIdx[arabicIdx.length - 1] + 1;
    for (let j = after; j < Math.min(lines.length, after + 4); j++) {
      if (isLatin(lines[j]) && !isBengali(lines[j])) {
        result.transliteration = normalize(lines[j]);
        break;
      }
    }

    // bengali may follow transliteration or be the next non-arabic line
    if (bengaliIdx !== -1) result.bengali = normalize(lines[bengaliIdx]);
    else {
      for (let j = after; j < Math.min(lines.length, after + 8); j++) {
        if (isBengali(lines[j])) {
          result.bengali = normalize(lines[j]);
          break;
        }
      }
    }
    // try to capture a reference line (hadith/source) anywhere in the chunk
    const refLine = lines.find(l => /(হাদিস|Hadith|সূত্র|রেফারেন্স|Reference|Bukhari|Muslim|Tirmidhi|Abu Dawood)/i.test(l));
    if (refLine) result.reference = normalize(refLine);
  } else {
    // no Arabic detected; fallback: if Bengali exists, try to find transliteration (Latin) above/below
    if (bengaliIdx !== -1) result.bengali = normalize(lines[bengaliIdx]);
    if (latinIdx !== -1) result.transliteration = normalize(lines[latinIdx]);
    const refLine = lines.find(l => /(হাদিস|Hadith|সূত্র|রেফারেন্স|Reference|Bukhari|Muslim|Tirmidhi|Abu Dawood)/i.test(l));
    if (refLine) result.reference = normalize(refLine);
  }

  return result;
}

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const all = {};

  for (const catId of CATEGORY_IDS) {
    const url = `https://muslimbangla.com/dua-category/${catId}`;
    console.log('Scraping', url);
    try {
      // set a common user-agent to be polite and avoid mistaken blocking
      await page.setExtraHTTPHeaders({ 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36' });
      await page.goto(url, { waitUntil: 'networkidle' });
      // wait a short time for client-side rendering and try to ensure common content is visible
      await page.waitForTimeout(800);
      // try waiting for likely content to appear
      try {
        await page.waitForSelector('.single-dua, .dua-card, .post-card, article, .entry', { timeout: 1400 });
      } catch (e) {
        // ignore: fallback to longer wait and scroll capture
      }

      // gentle scroll to the end to trigger lazy-loading content
      await page.evaluate(async () => {
        const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        window.scrollTo({ top: 0, behavior: 'instant' });
        for (let y = 0; y < total; y += 400) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo({ top: total, behavior: 'instant' });
      });
      await page.waitForTimeout(300);

      const items = await page.evaluate(() => {
        // collect candidate nodes that likely contain dua entries
        const selectors = [
          '.post-card',
          '.dua-card',
          '.dua-item',
          '.single-dua',
          '.entry',
          '.card',
          'article',
          '.post',
          '.blog-post'
          ,'.entry-content', '.post-content', '.post-body', '.entry-body', '.content-body'
        ];

        const nodes = new Set();
        for (const s of selectors) {
          document.querySelectorAll(s).forEach(n => nodes.add(n));
        }

        // fallback: use list items inside main
        if (nodes.size === 0) {
          const main = document.querySelector('main') || document.body;
          main.querySelectorAll('li').forEach(n => nodes.add(n));
        }

        const results = [];
        for (const node of nodes) {
          const text = node.innerText || node.textContent || '';
          if (!text.trim()) continue;
          results.push(text.trim());
        }
        return results;
      });

      // split each raw node text into logical chunks (double-newline or other separators)
      const parsed = [];
      for (const raw of items) {
        // split by two or more newlines first, fallback to single newline groups
        const chunks = raw.split(/\n{2,}/).map(c => c.trim()).filter(Boolean);
        const effectiveChunks = chunks.length ? chunks : [raw];

        for (const chunk of effectiveChunks) {
          const lines = extractLines(chunk);

          // If there are multiple Arabic lines inside chunk, try to split by Arabic line indices
          const arabicLineIndices = lines.map((l, i) => (isArabic(l) ? i : -1)).filter(i => i >= 0);

          if (arabicLineIndices.length > 1) {
            // create sub-chunks per arabic start
            for (let a = 0; a < arabicLineIndices.length; a++) {
              const start = arabicLineIndices[a];
              const end = a + 1 < arabicLineIndices.length ? arabicLineIndices[a + 1] : lines.length;
              const sub = lines.slice(start, end);
              const guessed = guessFieldsFromChunk(sub);
              if (guessed.arabic || guessed.bengali || guessed.transliteration) {
                parsed.push({ raw: chunk, ...guessed });
                if (DEBUG) console.debug('  >> CHUNK-GUESSED', JSON.stringify(guessed));
              }
            }
          } else {
            const guessed = guessFieldsFromChunk(lines);
            if (guessed.arabic || guessed.bengali || guessed.transliteration) {
              parsed.push({ raw: chunk, ...guessed });
              if (DEBUG) console.debug('  >> CHUNK-GUESSED', JSON.stringify(guessed));
            } else {
              // fallback: try best-effort scanning across lines
              const anyArabic = lines.find(l => isArabic(l)) || '';
              const anyBengali = lines.find(l => isBengali(l)) || '';
              const anyLatin = lines.find(l => isLatin(l)) || '';
              if (anyArabic || anyBengali || anyLatin) {
                const fallback = { raw: chunk, arabic: normalize(anyArabic), bengali: normalize(anyBengali), transliteration: normalize(anyLatin) };
                parsed.push(fallback);
                if (DEBUG) console.debug('  >> CHUNK-FALLBACK', JSON.stringify(fallback));
              }
            }
          }
        }
      }

      // number and filter results
      const numbered = parsed
        .filter(p => p.arabic || p.bengali || p.transliteration)
        .map((p, idx) => ({ id: idx + 1, arabic: p.arabic || '', bengaliTranslation: p.bengali || '', transliteration: p.transliteration || '', raw: p.raw }));

      all[catId] = numbered;
      console.log(`  -> found ${all[catId].length} items`);
    } catch (err) {
      console.error('  Error scraping', url, err.message || err);
      all[catId] = [];
    }
  }

  await browser.close();

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(all, null, 2), 'utf-8');
  console.log('Saved scraped data to', OUT_PATH);
}

scrape().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
