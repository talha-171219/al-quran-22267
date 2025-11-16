Fetch YouTube playlist into JSON for the app
===========================================

This script fetches the YouTube playlist RSS (no API key required) and writes a JSON file into `public/gojol/` that the frontend can read.

Requirements
------------
- Node.js (installed)
- `xml2js` package. Install with:

  ```powershell
  npm install xml2js
  ```

Usage
-----

1. Run the script with the playlist ID (the part after `list=`) and optional output filename:

   ```powershell
   node .\scripts\fetch_playlist.js PL41QeZZwyp_MWTWXs6wLxgxYkWwaP42gn playlist_sample.json
   ```

2. The script writes `public/gojol/playlist_sample.json` containing:

   {
     "items": [ { "id": "VIDEOID", "title": "...", "thumbnail": "..." }, ... ]
   }

3. The frontend `GojolArabic` page will automatically load `/gojol/playlist_sample.json` if present and render the cards.

Notes
-----
- The RSS approach uses YouTube's public feed and does not require API keys, but fetches only the public entries.
- If you want more metadata (artist, description), consider using YouTube Data API with an API key.
