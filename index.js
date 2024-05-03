const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express();

const URL = 'https://www.theguardian.com/europe';

axios(URL)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.dcr-16c50tn', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')

            articles.push({
                title,
                url
            });
        });

        console.log(articles);

    }).catch(err => console.log(err))



app.listen(PORT, () => {
    console.log(`Сервер стартанув на PORT: ${PORT}`);
})