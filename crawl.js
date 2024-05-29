import { JSDOM} from 'jsdom'
/**
 * Normalizes an URL to its host + path
 * 
 * @param {string} URL - URL as strings
 * @returns {string} normalizedURL = domain + path
 */
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


/**
 * Returns a list of all URLs within an html body
 * 
 * @param {string} htmlBody - Content of html body
 * @param {string} baseURL - Base URL of website
 * @returns {string} normalizedURL = domain + path
 */
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


export { normalizeURL, getURLsfromHTML }