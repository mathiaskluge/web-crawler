import { JSDOM} from 'jsdom'

async function crawlPage(baseURL, currentUrl, pages) {
    try {
        const url = new URL(currentUrl);
        const baseDomain = new URL(baseURL).hostname;
        if (url.hostname !== baseDomain) {
            return pages;
        }

        const normalizedUrl = normalizeURL(currentUrl);

        if (pages[normalizedUrl]) {
            pages[normalizedUrl].count++;
            return pages;
        }

        pages[normalizedUrl] = { count: 1 };

        const html = await fetchAndParseHTML(currentUrl);
        const urls = getURLsfromHTML(html, baseURL);

        for (const url of urls) {
            await crawlPage(baseURL, url, pages);
        }

        return pages;
    } catch (error) {
        console.error(error);
        return pages;
    }
}


function normalizeURL(url) {
    let inputUrl = ''
    const supportedProtocols = ['http:', 'https:']

    try {
        inputUrl = new URL(url)
    } catch (err) {
        throw new TypeError(err.message)
    }
    
    if (supportedProtocols.includes(inputUrl.protocol)) {
        if (inputUrl.pathname.endsWith('/')) {
            return inputUrl.host.concat('', inputUrl.pathname.slice(0,-1))
        } else{
            return inputUrl.host.concat('', inputUrl.pathname)
        }
    } else {
        throw new Error(`"${inputUrl.protocol}" not supported. Expects "http:" or "https:"`)
    }
}


async function fetchAndParseHTML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        const html = await response.text();
        return html;
    } catch (error) {
        console.error(error);
        return '';
    }
}


function getURLsfromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')
    const urls = []

    anchors.forEach((anchor) => {
        if (anchor.hasAttribute('href') && URL.canParse(anchor, baseURL)) {
            urls.push(new URL(anchor, baseURL).href)
        } else {
            try {
                urls.push(new URL(anchor).href)
            } catch (err) {
                throw new TypeError(err.message)
            }              
        }
    })
    return urls
}


export { normalizeURL, getURLsfromHTML, crawlPage }