#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Usage: node importScrapedJsonToTs.js <jsonPath> [--confirm-import]
// or set environment variable CONFIRM_IMPORT=1

const argPath = process.argv[2];
const confirmFlag = process.env.CONFIRM_IMPORT === '1' || process.argv.includes('--confirm-import');
if (!confirmFlag) {
  console.error('\nERROR: This import script will generate a TypeScript file from a JSON input.');
  console.error('Please confirm the import by passing --confirm-import or setting CONFIRM_IMPORT=1 as an environment variable.');
  process.exit(2);
}

const INPUT = argPath || path.resolve(process.cwd(), 'src', 'data', 'moreDuasScraped.json');
const OUT_PATH = path.resolve(process.cwd(), 'src', 'data', 'moreDuasGenerated.ts');

function normStr(v) {
  if (!v) return '';
  return String(v).replace(/\s+/g, ' ').trim();
}

function loadJson(p) {
  try {
    const raw = fs.readFileSync(p, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load JSON from', p, err.message || err);
    process.exit(1);
  }
}

const data = loadJson(INPUT);
if (!data || typeof data !== 'object') {
  console.error('Input JSON invalid or empty');
  process.exit(1);
}

const out = {};
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

const fileContent = `import type { DuaItem } from './moreDuasData';\n\nexport const allDuas: { [categoryId: number]: DuaItem[] } = ${JSON.stringify(out, null, 2)};\n`;
fs.writeFileSync(OUT_PATH, fileContent, 'utf-8');
console.log('Wrote generated TS to', OUT_PATH);
