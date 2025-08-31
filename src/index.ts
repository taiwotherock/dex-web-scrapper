import { chromium } from 'playwright';
import { insertData,getMySQLDateNow } from './save-price';

async function run() {
 
    //connect the existing browser using Websocket debugger address
//const browser = await chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/2206801a-755c-4843-a281-36052467d36c');

const browser = await chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/41aeac2b-fa43-4ded-9297-a5525bb1e44e');

const defaultContext =  browser.contexts()[0] //get the first opened tab
const page = defaultContext.pages()[0];

/**
 * type and test the code snippet after this line
 */
//await page.goto('https://dexscreener.com/solana/meteora')
await page.goto('https://dexscreener.com/solana'); ///solana/raydium')
//await expect(page).toHaveURL(/amazon/)
console.log("processing")
const title =await page.title()
console.log("Title " + title)

let links = page.locator("a.ds-dex-table-row");
const count = await links.count();
console.log("count is " + count); 

let i =0;
for (i=0; i<100; i++)
{
    i++;
    const token = await links.nth(i).locator("div.ds-dex-table-row-col-token").innerText();
    console.log(i + " token " + token); 
    const img = await links.nth(i).locator("img.ds-dex-table-row-token-icon-img").innerHTML();
    const imgUrl = await links.nth(i).locator("img.ds-dex-table-row-token-icon-img").getAttribute('src');
    const symbol = await links.nth(i).locator(".ds-dex-table-row-base-token-symbol").innerText();
    const price = await links.nth(i).locator(".ds-dex-table-row-col-price").innerText();
    const volume = await links.nth(i).locator(".ds-dex-table-row-col-volume").innerText();
    const priceChange5m = await links.nth(i).locator(".ds-dex-table-row-col-price-change-m5").innerText();
    const priceChangeh1 = await links.nth(i).locator(".ds-dex-table-row-col-price-change-h1").innerText();
    const priceChangeh6 = await links.nth(i).locator(".ds-dex-table-row-col-price-change-h6").innerText();
    const priceChangeh24 = await links.nth(i).locator(".ds-dex-table-row-col-price-change-h24").innerText();
    const marketCap = await links.nth(i).locator(".ds-dex-table-row-col-market-cap").innerText();
    const liquidity = await links.nth(i).locator(".ds-dex-table-row-col-liquidity").innerText();
    console.log(i + " img " + img + " " + imgUrl); 
    console.log(i + " symbol " + symbol + " price " + price);
    console.log(i + " volume " + volume + " price 24h  " + priceChangeh24);
    console.log(i + " mcap " + marketCap + " price 5m" + priceChange5m);
    console.log(i + " liquidity " + liquidity);

    insertData(symbol,convertStringMK(marketCap),convertStringMK(liquidity),convertStringMK(price),getMySQLDateNow(),convertStringMK(volume))
}

//await links.nth(0).click();

//for (const li of await page.getByRole('listitem').all())
  //await li.click();


/**
 * don't close the browser or page instance
 */



}

function convertStringMK(numS: string) {
    
    if(numS.indexOf('$') >= 0)
       numS = numS.replace('$','').trim();

    if(numS.indexOf(',') >= 0)
       numS = numS.replace(',','').trim();
    
    if(numS.indexOf('M') > 0)
       numS = numS.replace('M','000000').trim();
     console.log('nums ' + numS);

     if(numS.indexOf('K') > 0)
     numS = numS.replace('K','000').trim();

   console.log('nums ' + numS);

   return Number(numS);


}

run().catch((err) => {
  console.error('Error:', err);
});