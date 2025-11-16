const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://muslimbangla.com';
const CATEGORIES_URL = `${BASE_URL}/dua-categories`;
const OUTPUT_FILE = path.join(__dirname, '../duajson/dua_categories.json');

async function fetchHtml(url) {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return null;
    }
}

async function scrapeCategories() {
    console.log('Scraping categories...');
    const html = await fetchHtml(CATEGORIES_URL);
    if (!html) return [];

    const $ = cheerio.load(html);
    const categories = [];

    $('a[href^="/dua-category/"]').each((i, el) => {
        const categoryUrl = BASE_URL + $(el).attr('href');
        const categorySlug = $(el).attr('href').split('/').pop();
        const categoryName = $(el).find('h3').text().trim();
        
        if (categoryName && categorySlug && categoryUrl) {
            categories.push({
                name: categoryName,
                slug: categorySlug,
                url: categoryUrl,
                duas: []
            });
        }
    });
    console.log(`Found ${categories.length} categories.`);
    return categories;
}

async function scrapeDuasForCategory(category) {
    console.log(`Scraping duas for category: ${category.name} (${category.url})`);
    const html = await fetchHtml(category.url);
    if (!html) return;

    const $ = cheerio.load(html);
    const duas = [];

    // Each dua item is wrapped in a div with specific classes
    $('.rounded-md.bg-white').each((i, el) => {
        let currentDua = {
            title: '',
            arabic: '',
            bangla_Pronunciation: '',
            bangla_Meaning: '',
            source: '', // Source is not consistently available in a distinct element
            category: category.name
        };

        // Extract title: it's inside an h1 which contains a p tag
        currentDua.title = $(el).find('h1 p.font-kalpurush').text().trim();

        // Extract Arabic text: it's in a div with class 'text-xl whitespace-pre-wrap'
        currentDua.arabic = $(el).find('div.text-xl.whitespace-pre-wrap').text().trim();

        // Extract Bangla Pronunciation: find the strong tag with "উচ্চারণঃ", then get the text from the next p tag within the div.white-space-pre-wrap
        const pronunciationStrong = $(el).find('strong:contains("উচ্চারণঃ")');
        if (pronunciationStrong.length) {
            currentDua.bangla_Pronunciation = pronunciationStrong.next('div.white-space-pre-wrap').find('p.font-kalpurush').text().trim();
        }

        // Extract Bangla Meaning: similar to pronunciation
        const meaningStrong = $(el).find('strong:contains("অর্থঃ")');
        if (meaningStrong.length) {
            currentDua.bangla_Meaning = meaningStrong.next('div.white-space-pre-wrap').find('p.font-kalpurush').text().trim();
        }
        
        // Check if any meaningful data was scraped for the dua
        if (currentDua.title || currentDua.arabic || currentDua.bangla_Pronunciation || currentDua.bangla_Meaning) {
            duas.push(currentDua);
        }
    });
    category.duas = duas;
    console.log(`Found ${category.duas.length} duas for category: ${category.name}`);
}

async function main() {
    let categories = await scrapeCategories();

    for (const category of categories) {
        await scrapeDuasForCategory(category);
    }

    const output = { categories: categories };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`Scraping complete. Data saved to ${OUTPUT_FILE}`);
}

main();
