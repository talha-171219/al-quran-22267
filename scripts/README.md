Scraper and Merge scripts for more Duas
====================================

Overview
--------
This directory contains the automation used to scrape dua entries from muslimbangla.com and generate a TypeScript file for the application:
- `scrapeMuslimBangla.js` — a Playwright-based scraper which renders pages, extracts content, and writes `src/data/moreDuasScraped.json`.
- `mergeScrapedToTs.js` — reads the scraped JSON and writes `src/data/moreDuasGenerated.ts` as `export const allDuas` matching the app types.

Requirements
------------
- Node.js and npm
- Playwright with browser binaries (to render client-side content)

Install
-------
```powershell
npm i -D playwright
npx playwright install
```

Run scraping (one category or many)
---------------------------------
By default it scrapes categories 1..38. You can override set the `CATEGORIES` env variable or pass a CLI argument as follows:

Examples:
```powershell

# Scrape everything (1..38) - WARNING: this downloads content from muslimbangla.com. Do NOT run unless you have permission to copy and store their content.
# Grant permission by setting environment variable `ALLOW_EXTERNAL_COPY=1` or passing `--allow-copy` on the CLI
npm run scrape:duas

# Scrape only category 13 and 14
node .\scripts\scrapeMuslimBangla.js 13,14

# Scrape a range, e.g., 10 to 15
node .\scripts\scrapeMuslimBangla.js 10-15

# Use env var
$env:CATEGORIES = '13-18'; node .\scripts\scrapeMuslimBangla.js

# Debug mode prints chunk-level guessed fields
$env:DEBUG = '1'; node .\scripts\scrapeMuslimBangla.js --debug

# Example (with explicit permission)
$env:ALLOW_EXTERNAL_COPY = '1'; node .\scripts\scrapeMuslimBangla.js 13-18 --debug
```

Merge scraped JSON into TypeScript
---------------------------------
```powershell
node .\scripts\mergeScrapedToTs.js
```

Or run both scripts:
```powershell
npm run scrape-and-merge
```

Validation
----------
Inspect the generated JSON: `src/data/moreDuasScraped.json` and check for keys of the category ids. Each array item will look like:

```
{
  "id": 1,
  "arabic": "...",
  "bengaliTranslation": "...",
  "transliteration": "...",
  "reference": "...",
  "raw": "..."
}
```

After running merge, open `src/data/moreDuasGenerated.ts` and ensure `allDuas` contains the categories and `DuaItem[]` arrays.

Notes and Troubleshooting
-------------------------
- If scraping fails for some pages, try increasing timeouts or the `waitForTimeout` values in the script.
- If fields look misaligned, run with `DEBUG=1` and view console logs; you can paste a few `raw` examples here for me to tune the heuristics.
- Verify copyright & usage rights before copying content into your app.

Legal & Attribution
-------------------
- Do not scrape, copy, or distribute content from muslimbangla.com (or any third-party site) without explicit permission from the site owner.
- If you do not have permission (`permission nai`), do not run the scraper. Instead consider:
  - Linking to the original pages in your app from the category list (open in external tab or iframe, if allowed).
  - Requesting permission from the site owner for bulk content use or obtaining a license.
  - Adding your own original translations/summaries or sourcing content from public-domain / CC-licensed collections.
  - Allow user-provided content: add a small admin UI to paste approved text into app data.

If you'd like help with any of these alternatives, tell me which one and I'll prepare an implementation.

If you want, paste a few entries from `src/data/moreDuasScraped.json` here and I'll help tune heuristics or convert them to `allDuas` for you.

Manual Import (recommended when you have approved content)
--------------------------------------------------------
If you have a JSON file that you have permission to include (e.g., provided by the site owner or original content), you can import it manually using the importer script. This avoids scraping and respects copyright.

1. Place your approved JSON file somewhere (e.g., `approved.json`).
2. Run the importer with explicit confirmation flag:
```powershell
node .\scripts\importScrapedJsonToTs.js approved.json --confirm-import
```
or set the env var:
```powershell
$env:CONFIRM_IMPORT = '1'; node .\scripts\importScrapedJsonToTs.js approved.json
```

This will write the validated `src/data/moreDuasGenerated.ts` file which your app imports. Only use this script for content you are allowed to distribute.
