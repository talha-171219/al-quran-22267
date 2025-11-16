Download Gojol MP3s
===================

This folder contains a small Node script to download approved MP3 files into the app's `public/gojol/` directory.

How to use
----------

1. Copy the example mapping to a working file:

   ```powershell
   copy .\scripts\gojol_urls.example.json .\scripts\gojol_urls.json
   ```

2. Edit `scripts/gojol_urls.json` and paste direct `.mp3` URLs for each `filename`.

3. Run the downloader from the repo root:

   ```powershell
   node .\scripts\download_gojol_mp3s.js
   ```

The script will save files to `public/gojol/` (creates the folder if needed). It follows simple redirects but expects direct `.mp3` URLs.

Notes
-----
- Only run this if you have the right to download and store the MP3s in this repository.
- If you want me to run the script here, paste the completed `scripts/gojol_urls.json` content in chat or provide the direct mp3 URLs and I will run it (you already confirmed permission). Otherwise run locally.
