import https from 'https';
import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';

// Usage: node scripts/fetch_playlist.js PLAYLIST_ID output_filename.json
const args = process.argv.slice(2);
const playlistId = args[0];
const outFile = args[1] || 'playlist_sample.json';
if (!playlistId) {
  console.error('Usage: node scripts/fetch_playlist.js PLAYLIST_ID [outFile]');
  process.exit(1);
}

const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

function fetchUrl(u) {
  return new Promise((resolve, reject) => {
    https.get(u, (res) => {
      if (res.statusCode !== 200) return reject(new Error('Failed to fetch: ' + res.statusCode));
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async function(){
  try {
    console.log('Fetching playlist RSS...');
    const xml = await fetchUrl(url);
    const parsed = await xml2js.parseStringPromise(xml);
    const entries = parsed.feed.entry || [];
    const items = entries.map(e => {
      const id = e['yt:videoId'] && e['yt:videoId'][0];
      const title = e.title && e.title[0];
      const thumbnail = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
      return { id, title, thumbnail };
    }).filter(Boolean);

    const outPath = path.resolve(process.cwd(), 'public', 'gojol', outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify({ items }, null, 2), 'utf8');
    console.log('Saved', outPath);
  } catch (e) {
    console.error('Error:', e.message || e);
  }
})();
