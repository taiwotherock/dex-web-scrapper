"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
async function fetchchaintran() {
    //connect the existing browser using Websocket debugger address
    const browser = await playwright_1.chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/3ae154d4-85e2-4624-a505-8b89c47a6182'); //'ws://127.0.0.1:9242/devtools/browser/21c1542d-cba3-4186-9a94-eb2ada6db3c5');
    const defaultContext = browser.contexts()[0]; //get the first opened tab
    const page = defaultContext.pages()[0];
    /**
     * type and test the code snippet after this line
     */
    //await page.goto('https://dexscreener.com/solana/meteora')
    await page.goto('https://nile.tronscan.org/#/address/TLQZunpWvD8EQKEEwLQuPF1cteKknHvXGi'); //'https://tronscan.org/#/token20/TU3kjFuhtEo42tsCBtfYUAZxoqQ4yuSLQ5'); ///solana/raydium')
    //await expect(page).toHaveURL(/amazon/)
    console.log("processing");
    const title = await page.title();
    console.log("Title " + title);
    //let imgUrl = await page.locator("img.logo-img").getAttribute('src');
    let divtable = page.locator("div.ant-table-body");
    await divtable.waitFor();
    let table = divtable.locator("table").nth(0);
    await table.waitFor();
    console.log("data " + table.innerHTML() + " " + table.innerText());
    let rows = await table.locator("tbody tr");
    let count = await rows.count();
    console.log("count " + count);
    let i = 0;
    for (i = 0; i < count; i++) {
        //i++;
        //<td _ngcontent-ng-c53117338=""> 18737 </td>
        //const sno = await rows.nth(i).locator("td").nth(0).innerText()
        try {
            const txId = await rows.nth(i).locator("div.ellipsis_box_start").innerText();
            console.log('TxtId ' + txId);
        }
        catch (err) {
            console.log('Print error ' + err);
        }
    }
    return { success: true };
}
fetchchaintran().catch((err) => {
    console.error('Error:', err);
});
