"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const save_giftcard_1 = require("./save-giftcard");
async function run() {
    //connect the existing browser using Websocket debugger address
    const browser = await playwright_1.chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/21c1542d-cba3-4186-9a94-eb2ada6db3c5');
    const defaultContext = browser.contexts()[0]; //get the first opened tab
    const page = defaultContext.pages()[0];
    /**
     * type and test the code snippet after this line
     */
    //await page.goto('https://dexscreener.com/solana/meteora')
    await page.goto('https://dashboard.reloadly.com/pricing/giftcards?page=1&size=3000'); ///solana/raydium')
    //await expect(page).toHaveURL(/amazon/)
    console.log("processing");
    const title = await page.title();
    console.log("Title " + title);
    //let links = page.locator("a.ds-dex-table-row");
    //const count = await links.count();
    //console.log("count is " + count); 
    //let tds = page.locator("td._ngcontent-ng-c53117338");
    let table = page.locator("table.reloadly-table");
    await table.waitFor();
    console.log("data " + table.innerHTML() + " " + table.innerText());
    let rows = await table.locator("tr.pricing-row");
    let count = await rows.count();
    console.log("count " + count);
    let i = 0;
    for (i = 0; i < count; i++) {
        //i++;
        //<td _ngcontent-ng-c53117338=""> 18737 </td>
        const sku = await rows.nth(i).locator("td").nth(0).innerText();
        const country = await rows.nth(i).locator("td").nth(1).innerText();
        const product = await rows.nth(i).locator("td").nth(2).innerText();
        const ccy = await rows.nth(i).locator("td").nth(3).innerText();
        const sendables = await rows.nth(i).locator("td").nth(4).innerText();
        const discounts = await rows.nth(i).locator("td").nth(5).innerText();
        const discount = Number(discounts.replace("%", "").trim());
        const code = 'GFT_' + sku;
        let amts = sendables.split("~");
        let minAmt = 0, maxAmt = 0;
        if (amts.length > 1) {
            minAmt = Number(amts[0].trim());
            maxAmt = Number(amts[1].trim());
        }
        console.log('sku ' + sku + " " + product + " " + sendables + " " + discounts);
        console.log('sku ' + minAmt + " " + maxAmt + " " + country);
        (0, save_giftcard_1.insertData)(code, product, '', discount, minAmt, maxAmt, country, sendables);
        //insertData('1','test','',0,0,0,'US',sendables);
    }
    browser.close();
}
run().catch((err) => {
    console.error('Error:', err);
});
