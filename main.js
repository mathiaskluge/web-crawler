import { getURLsfromHTML } from './crawl.js'

console.log('hello world')


getURLsfromHTML(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Links Example</title>
</head>
<body>
    <h1>Links Example</h1>
    <p>Here are some links:</p>
    <ul>
        <li><a href="https://www.example.com">Example Website</a></li>
        <li><a href="/about">Another Example Website</a></li>
        <li><a href="https://www.example.net">Yet Another Example Website</a></li>
    </ul>
</body>
</html>`, '')