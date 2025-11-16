import fs from 'fs';
import path from 'path';

// Usage: node scripts/merge_playlists.js existing.json new.json [out.json]
const args = process.argv.slice(2);
const existingFile = args[0];
const newFile = args[1];
const outFile = args[2] || existingFile;

if (!existingFile || !newFile) {
  console.error('Usage: node scripts/merge_playlists.js existing.json new.json [out.json]');
  process.exit(1);
}

function readJson(p) {
  try {
    const raw = fs.readFileSync(path.resolve(process.cwd(), p), 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { items: [] };
  }
}

const existing = readJson(existingFile);
const incoming = readJson(newFile);

const existingIds = new Set((existing.items || []).map(i => i.id));
const toAppend = (incoming.items || []).filter(i => i && i.id && !existingIds.has(i.id));

const merged = { items: [ ...(existing.items || []), ...toAppend ] };

const outPath = path.resolve(process.cwd(), outFile);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8');

console.log('Merged', (existing.items || []).length, 'existing items with', (incoming.items || []).length, 'incoming items.');
console.log('Appended', toAppend.length, 'new items. Saved to', outPath);
