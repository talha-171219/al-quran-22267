import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

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

    $('.category-item').each((i, el) => {
        const categoryName = $(el).find('h3').text().trim();
        const categorySlug = $(el).find('a').attr('href').split('/').pop();
        const categoryUrl = BASE_URL + $(el).find('a').attr('href');
        
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

    $('.dua-item').each((i, el) => {
        const title = $(el).find('.dua-title').text().trim();
        const arabic_text = $(el).find('.arabic-text').text().trim();
        const bangla_Pronunciation = $(el).find('.bangla-pronunciation').text().trim();
        const bangla_Meaning = $(el).find('.bangla-meaning').text().trim();
        const source = $(el).find('.dua-source').text().trim();

        if (title || arabic_text || bangla_Pronunciation || bangla_Meaning) {
            category.duas.push({
                title: title,
                arabic: arabic_text,
                bangla_Pronunciation: bangla_Pronunciation,
                bangla_Meaning: bangla_Meaning,
                source: source,
                category: category.name // Add category name to each dua
            });
        }
    });
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
