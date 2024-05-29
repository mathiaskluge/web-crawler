import { test, expect } from "@jest/globals"
import { getURLsfromHTML, normalizeURL } from './crawl.js'

test('normalizeURL: Not an URL', () => {
    expect(() => normalizeURL("this is not a URL")).toThrow(TypeError)
    expect(() => normalizeURL("this is not a URL")).toThrow('Invalid URL')
})

test('normalizeURL: Strips http', () => {
    expect(normalizeURL('http://www.domain.com/path')).toBe('www.domain.com/path')
})

test('normalizeURL: Strips https', () => {
    expect(normalizeURL('https://www.domain.com/path')).toBe('www.domain.com/path')
})

test('normalizeURL: unsupported protocol (or wrong syntax)', () => {
    expect(() => normalizeURL('fish://www.domain.com/path/')).toThrow(Error)
    expect(() => normalizeURL('fish://www.domain.com/path/')).toThrow('"fish:" not supported. Expects "http:" or "https:"')
})

test('normalizeURL: Strips "/" from end, if there is one', () => {
    expect(normalizeURL('http://www.domain.com/path/')).toBe('www.domain.com/path')
    expect(normalizeURL('http://www.domain.com/path/')).toBe('www.domain.com/path')
})



test('getURLsfromHTML: No Links', () => {
    expect(getURLsfromHTML('<p>Here are some links:</p><ul></ul>', 'https://www.base.com')).toStrictEqual([]);
});

test('getURLsfromHTML: relative Link', () => {
    expect(getURLsfromHTML(`<ul><a href="/about">About</a></ul>`, 'https://www.base.com')).toStrictEqual(['https://www.base.com/about']);
});

test('getURLsfromHTML: absolute Link, internal', () => {
    expect(getURLsfromHTML(`<ul><a href="https://www.base.com/about">About</a></ul>`, 'https://www.base.com')).toStrictEqual(['https://www.base.com/about']);
});

test('getURLsfromHTML: absolute Link, external', () => {
    expect(getURLsfromHTML(`<ul><a href="https://www.differentbase.com">About</a></ul>`, 'https://www.base.com')).toStrictEqual(['https://www.differentbase.com/']);
});


test('getURLsfromHTML: multiple links', () => {
    const testBody = `
    <h1>Links Example</h1>
    <p>Here are some links:</p>
    <ul>
        <li><a href="https://www.base.com/test">External Link</a></li>
        <li><a href="/about">relative Link</a></li>
        <li><a href="https://www.differentbase.com">Yet Another Example Website</a></li>
    </ul>`
    expect(getURLsfromHTML(testBody, 'https://www.base.com')).toStrictEqual(['https://www.base.com/test', 'https://www.base.com/about', 'https://www.differentbase.com/']);
});