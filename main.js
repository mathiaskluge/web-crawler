import { crawlPage } from './crawl.js'


async function main() {
    if (process.argv.length !== 3) {
        console.log("Usage: node script.js <URL>");
        return;
    }

    const url = process.argv[2];
    console.log(`Starting to crawl "${url}"\n`);

    try {
        const pages = await crawlPage(url, url, {}); // Pass the same URL for baseURL and currentUrl, and an empty object for pages
        console.log("Crawling completed. Pages:\n");
        for (let key in pages) {
            console.log(key);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();