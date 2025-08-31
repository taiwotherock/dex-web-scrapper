import { chromium } from 'playwright';
import { insertData } from './save-coingecko';

async function run() {
 
    //connect the existing browser using Websocket debugger address
const browser = await chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/6ac044a8-867a-4fb1-bf4e-03c5297a94ff');
const defaultContext =  browser.contexts()[0] //get the first opened tab
const page = defaultContext.pages()[0];

/**
 * type and test the code snippet after this line
 */
//await page.goto('https://dexscreener.com/solana/meteora')
await page.goto('https://www.coingecko.com/'); ///solana/raydium')
//await expect(page).toHaveURL(/amazon/)
console.log("processing")
const title =await page.title()
console.log("Title " + title)

//let links = page.locator("a.ds-dex-table-row");
//const count = await links.count();
//console.log("count is " + count); 

//let tds = page.locator("td._ngcontent-ng-c53117338");

let table = page.locator("table.tw-border-y");
await table.waitFor();
  console.log("data " + table.innerHTML() + " " + table.innerText())
let rows = await table.locator("tr.tw-bg-white")
let count = await rows.count();
console.log("count " + count) 
let i =0;

  for (i=0; i<count; i++)
  {
      //i++;
      //<td _ngcontent-ng-c53117338=""> 18737 </td>
      const sno = await rows.nth(i).locator("td").nth(0).innerText()
      const imgUrl = await rows.nth(i).locator("td").nth(2).locator("img").getAttribute("src")
      const name = await rows.nth(i).locator("td").nth(2).locator("img").getAttribute("alt")
      const price = await rows.nth(i).locator("td").nth(4).locator("span").innerText()
      const price1h = await rows.nth(i).locator("td").nth(5).locator("span").innerText()
      const price24h = await rows.nth(i).locator("td").nth(6).locator("span").innerText()
      const price7d = await rows.nth(i).locator("td").nth(7).locator("span").innerText()
      const volume = await rows.nth(i).locator("td").nth(8).locator("span").innerText()
      console.log("imag " + sno + " " + imgUrl + " " + name + " " + price)
      console.log("imag " + price1h + " " + price24h + " " + price7d + " " + volume)
      var namex = name ?? ''
      var img = imgUrl ?? ''
      
      insertData(namex,namex,'',img);


  }

  browser.close()


}


run().catch((err) => {
  console.error('Error:', err);
});