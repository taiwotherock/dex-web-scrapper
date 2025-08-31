"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
async function run() {
    //connect the existing browser using Websocket debugger address
    const browser = await playwright_1.chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/4917412c-6280-4e5d-9765-07c4718dd542');
    const defaultContext = browser.contexts()[0]; //get the first opened tab
    const page = defaultContext.pages()[0];
    /**
     * type and test the code snippet after this line
     */
    //await page.goto('https://dexscreener.com/solana/meteora')
    await page.goto('https://pickbazar-react-rest.vercel.app/gadget'); ///solana/raydium')
    //await expect(page).toHaveURL(/amazon/)
    console.log("processing");
    const title = await page.title();
    console.log("Title " + title);
    //let links = page.locator("a.ds-dex-table-row");
    //const count = await links.count();
    //console.log("count is " + count); 
    //let tds = page.locator("td._ngcontent-ng-c53117338");
    let table = page.locator("div.w-full").locator("div.grid"); //threadListCard
    await table.waitFor();
    console.log("data " + table.innerHTML() + " " + table.innerText());
    let rows = await table.locator(".product-card");
    let count = await rows.count();
    console.log("count " + count);
    let i = 0;
    for (i = 0; i < count; i++) {
        //i++;
        //<td _ngcontent-ng-c53117338=""> 18737 </td>
        //const sno = await rows.nth(i).locator("td").nth(0).innerText()
        try {
            const imgUrl = await rows.nth(i).locator(".relative").first().locator("img").getAttribute("src");
            const name = await rows.nth(i).locator(".relative").first().locator("img").getAttribute("alt");
            const price = await rows.nth(i).locator(".mb-2").first().locator("span.text-sm").innerText();
            const details = name;
            var price2 = 0;
            var ccy = 'USD';
            if (price.indexOf('$') > 0) {
                ccy = 'GBP';
                price2 = Number(price.replace('$', '').trim());
            }
            console.log("imag " + " " + imgUrl + " " + name + " " + price + " " + details);
            // var namex = name ?? ''
            var img = imgUrl ?? '';
            img = 'https://pickbazar-react-rest.vercel.app' + img;
            console.log("imag " + " " + img);
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            var pcode = 'UKT';
            for (var k = 0; k < 8; k++) {
                pcode += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            const data = {
                "productName": name,
                "productDescription": details,
                "productCategory": "Uk Products",
                "productCode": pcode,
                "productPrice": price2,
                "stockQuantity": 5,
                "unitQuantity": "Piece",
                //"base64Image": s.decode("ascii"),
                "imageURL": img,
                "costPrice": price2,
                "storeId": "STORE-GADGET",
                "barCode": "",
                "brand": "Uk Products",
                "ccy": ccy
            };
            const mmcpUrl = 'http://localhost:8008/mmcp/api/v1/stock-management/save';
            const headers = { 'Content-Type': 'application/json', 'x-entity-code': 'H2P' };
            const response2 = await fetch(mmcpUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                console.log(data);
            });
            console.log('response ' + JSON.stringify(response2));
        }
        catch (err) {
            console.error('Error fetching:', err);
        }
        //insertData(namex,namex,'',img);
    }
    browser.close();
}
run().catch((err) => {
    console.error('Error:', err);
});
