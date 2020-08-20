const puppeteer = require('puppeteer');

describe('Title Text', () => {
  test('title loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width:1500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.title');

    debugger

    const html = await page.$eval('.title', e => e.innerHTML);
    expect(html).toBe('Notes');

    browser.close();
  }, 16000);
});