const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const URL = 'https://pptr.dev/';
    await page.goto(URL);

    const allClasses = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const classesSet = new Set();

        elements.forEach(element => {
            if (element.classList.length > 0) {
                element.classList.forEach(cls => classesSet.add(cls));
            }
        });

        return Array.from(classesSet);
    });

    console.log('Усі класи елементів на сторінці:', allClasses);

    await browser.close();
})();
