import fs from 'fs';
import path from 'path';

// Usage: node scripts/append_playlist_force.js existing.json incoming.json [out.json]
const args = process.argv.slice(2);
const existingFile = args[0] || 'public/gojol/gojol_arabic_playlist.json';
const incomingFile = args[1] || 'public/gojol/fetched_playlist.json';
const outFile = args[2] || existingFile;

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), p), 'utf8'));
  } catch (e) {
    return { items: [] };
  }
}

const existing = readJson(existingFile);
const incoming = readJson(incomingFile);

const merged = { items: [ ...(existing.items || []), ...(incoming.items || []) ] };

const outPath = path.resolve(process.cwd(), outFile);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8');

console.log('Appended', (incoming.items || []).length, 'items to', outPath);
