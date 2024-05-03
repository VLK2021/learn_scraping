const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


const dirPath = path.join(process.cwd(), 'data');
const filePath = path.join(dirPath, 'classesArray.txt');


// Перевірка наявності папки та створення, якщо вона не існує
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

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

    const jsonClasses = JSON.stringify(allClasses);

    fs.writeFile(filePath, jsonClasses, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Файл успішно записаний.');
        }
    });

    await browser.close();
})();
