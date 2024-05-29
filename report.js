function printReport(pages) {
    const sortedPages = Object.fromEntries(
        Object.entries(pages).sort(([,a],[,b]) => b.count - a.count)
    )

    for (const [url, { count }] of Object.entries(sortedPages)) {
        console.log(`Found ${count} internal links to ${url}`)
    }
}

export { printReport }