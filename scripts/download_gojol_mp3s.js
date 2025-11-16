#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const urlsPath = path.resolve(__dirname, 'gojol_urls.json');
if (!fs.existsSync(urlsPath)) {
  console.error('Missing gojol_urls.json. Copy scripts/gojol_urls.example.json to scripts/gojol_urls.json and add URLs.');
  process.exit(1);
}

const mappings = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));
const outDir = path.resolve(__dirname, '..', 'public', 'gojol');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        return resolve(download(res.headers.location, dest));
      }
      if (res.statusCode !== 200) return reject(new Error('Download failed: ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
      file.on('error', (err) => reject(err));
    });
    req.on('error', reject);
  });
}

(async function(){
  for (const item of mappings) {
    const { filename, url } = item;
    if (!url || url.trim() === '') {
      console.log(`Skipping ${filename} — no URL provided.`);
      continue;
    }
    const dest = path.join(outDir, filename);
    try {
      console.log(`Downloading ${filename} from ${url} ...`);
      await download(url, dest);
      console.log(`Saved ${dest}`);
    } catch (e) {
      console.error(`Failed ${filename}:`, e.message || e);
    }
  }
})();
