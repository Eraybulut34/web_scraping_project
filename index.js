const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.hepsiburada.com/');

    const elements = await page.evaluate(() => {
        
        const anchors = Array.from(document.querySelectorAll('a.incele'));
        return anchors.map(anchor => anchor.href);
    });

    const goToUrl = async (url,index) => {
        await page.goto(url);
        let title = await page.title();
        await page.screenshot({ path: `./screenshots/${index}-${title}.png` });

    }

    const run = async () => {
        for (let index = 0; index < elements.length; index++) {
            await goToUrl(elements[index], index);
        }
    }

    await run();

    console.log(elements);
    await browser.close();
})();