import { crawlPage } from './crawl.js'
import { printReport } from './report.js';


async function main() {
    if (process.argv.length !== 3) {
        console.log("Usage: node script.js <URL>")
        return
    }

    const url = process.argv[2];
    console.log(`Starting to crawl "${url}"\n`)

    try {
        const pages = await crawlPage(url, url, {})
        console.log("Crawling completed. Pages:\n")
        printReport(pages)
    } catch (error) {
        console.error("Error:", error.message)
    }
}

main();