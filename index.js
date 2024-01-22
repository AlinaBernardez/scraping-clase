const express =require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://alinabernardez.github.io/Dashboard/';

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)

            const title = $('title').text();
            const links = [];
            const imgs = [];

            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            });
            $('img').each((index, element) => {
                const image = $(element).attr('src')
                imgs.push(image)
            });

            res.send(`
            <h1>${title}</h1>
            <ul>
                ${links.map(link => `<li>${link}</li>`).join('')}
            </ul>
            <ul>
                ${imgs.map(img => `<li>${img}</li>`).join('')}
            </ul>
            `)
        }
    })
})

app.listen(3000, () => {
    console.log('Express server listening http://localhost:3000')
});