import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SCRAPED_PATH = path.resolve(process.cwd(), 'src', 'data', 'moreDuasScraped.json');
const OUT_PATH = path.resolve(process.cwd(), 'src', 'data', 'moreDuasGenerated.ts');

function stringifyForTs(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/"([a-zA-Z0-9_\-]+)":/g, '$1:');
}

function makeFile(data) {
  // We import the type only to keep TS happy (type-only import).
  return `import type { DuaItem } from './moreDuasData';\n\nexport const allDuas: { [categoryId: number]: DuaItem[] } = ${JSON.stringify(data, null, 2)};\n`;
}

try {
  if (!fs.existsSync(SCRAPED_PATH)) {
    console.log('Scraped JSON not found; attempting to run scraper to generate it...');
    // Permission guard: only auto-run the scraper if allowed
    const ALLOW_COPY = process.env.ALLOW_EXTERNAL_COPY === '1' || process.env.ALLOW_EXTERNAL_COPY === 'true' || process.argv.includes('--allow-copy') || process.argv.includes('--force');
    if (!ALLOW_COPY) {
      console.error('ERROR: Permission required to create scraped JSON from an external site.');
      console.error('Set environment variable `ALLOW_EXTERNAL_COPY=1` or run with `--allow-copy` to permit scraping or provide the scraped JSON manually.');
      process.exit(2);
    }
    // run the scraper (same script) to generate JSON if missing
    try {
      execSync('node ./scripts/scrapeMuslimBangla.js --allow-copy', { stdio: 'inherit' });
    } catch (e) {
      console.error('Failed to run scraper automatically. Please run `npm run scrape:duas` manually with `ALLOW_EXTERNAL_COPY=1`.');
      process.exit(1);
    }
  }

  const raw = fs.readFileSync(SCRAPED_PATH, 'utf-8');
  const data = JSON.parse(raw);

  // Map scraped data into the DuaItem structure
  const out = {};
  function normStr(v) {
    if (!v) return '';
    return String(v).replace(/\s+/g, ' ').trim();
  }

  for (const catId of Object.keys(data)) {
    const items = Array.isArray(data[catId]) ? data[catId] : [];
    const mapped = items.map((it, idx) => ({
      id: idx + 1,
      arabic: normStr(it.arabic || it.arabicText || it.arabic_text || ''),
      bengaliTranslation: normStr(it.bengaliTranslation || it.bengali || it.bn || ''),
      transliteration: normStr(it.transliteration || it.translit || ''),
      reference: normStr(it.reference || it.ref || '')
    }));
    out[catId] = mapped;
    console.log(`Category ${catId}: ${mapped.length} items`);
  }

  const content = makeFile(out);
  fs.writeFileSync(OUT_PATH, content, 'utf-8');
  console.log('Wrote generated TS to', OUT_PATH);
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
