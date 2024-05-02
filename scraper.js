const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const URL = 'https://pptr.dev/';
    await page.goto(URL);

    const allArticles = await page.evaluate(() => {
       const article = document.querySelectorAll('article');


       return Array.from(article).slice(0, 5).map((article) => {
           const h1 = article.querySelector('h1').innerText;
           const h2 = article.querySelector('h2').innerText;
           return {h1, h2};
       });
    });
    console.log(allArticles);

    await browser.close();
})();