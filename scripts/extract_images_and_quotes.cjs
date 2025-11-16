const fs = require('fs');
const path = require('path');

const markdownContent = fs.readFileSync(path.join(__dirname, '../temp_quotes.md'), 'utf8');

const islamicImageQuotes = [];
const islamicTextQuotes = [];
const lines = markdownContent.split(/\r?\n/); // Split by both \n and \r\n

let currentImage = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // console.log(`Processing line: "${line}"`); // Debugging line

    // Regex to find image URLs and their larger versions
    const imageMatch = line.match(/!\[\]\((.*?)\)\]\((.*?)\)/);
    if (imageMatch) {
        const thumbnailUrl = imageMatch[1];
        const fullImageUrl = imageMatch[2];
        currentImage = {
            id: (islamicImageQuotes.length + 1).toString(),
            thumbnail: thumbnailUrl,
            full: fullImageUrl,
            quote: "" // Initialize with empty quote
        };
        islamicImageQuotes.push(currentImage);
        // console.log("Found image:", currentImage); // Debugging line
        continue;
    }

    // Regex to find quotes (numbered with Bengali numerals)
    const quoteMatch = line.match(/^([০-৯]+)\/\s*(.*)/); // Updated regex for Bengali numerals
    if (quoteMatch) {
        const quoteText = quoteMatch[2].trim();
        // For now, let's just add all numbered quotes to islamicTextQuotes
        islamicTextQuotes.push({
            id: (islamicTextQuotes.length + 1).toString(),
            quote: quoteText
        });
        // console.log("Found text quote:", quoteText); // Debugging line
        currentImage = null; // Reset currentImage as this is a standalone quote
    }
}

// Filter out image entries that don't have a thumbnail or full image (shouldn't happen with correct regex)
const filteredImageQuotes = islamicImageQuotes.filter(item => item.thumbnail && item.full);

fs.writeFileSync('src/data/islamicImageQuotes.json', JSON.stringify(filteredImageQuotes, null, 2));
fs.writeFileSync('src/data/islamicTextQuotes.json', JSON.stringify(islamicTextQuotes, null, 2));

console.log('Extracted image quotes saved to src/data/islamicImageQuotes.json');
console.log('Extracted text quotes saved to src/data/islamicTextQuotes.json');
