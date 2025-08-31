import { chromium } from 'playwright';

export async function fetchchaintran(chainUrl: string, chromeUrl: string) {
 
    //connect the existing browser using Websocket debugger address
const browser = await chromium.connectOverCDP(chromeUrl) //'ws://127.0.0.1:9242/devtools/browser/21c1542d-cba3-4186-9a94-eb2ada6db3c5');
const defaultContext =  browser.contexts()[0] //get the first opened tab
const page = defaultContext.pages()[0];

/**
 * type and test the code snippet after this line
 */
//await page.goto('https://dexscreener.com/solana/meteora')
await page.goto(chainUrl) // 'https://nile.tronscan.org/#/address/TLQZunpWvD8EQKEEwLQuPF1cteKknHvXGi') //'https://tronscan.org/#/token20/TU3kjFuhtEo42tsCBtfYUAZxoqQ4yuSLQ5'); ///solana/raydium')
//await expect(page).toHaveURL(/amazon/)
console.log("processing")
const title =await page.title()
console.log("Title " + title)

//let imgUrl = await page.locator("img.logo-img").getAttribute('src');

let divtable = page.locator("div.ant-table-body")
await divtable.waitFor();

let table = page.locator("table").nth(0)
await table.waitFor();

  console.log("data " + table.innerHTML() + " " + table.innerText())
let rows = await table.locator("tbody").locator("tr")
let count = await rows.count();
console.log("count " + count) 
let i =0;

await page.locator('table tbody tr:nth-child(2) td.ant-table-cell:nth-child(2)')
  .innerText({ timeout: 60000 });

  for (i=1; i<count; i++)
  {
      //i++;
      //<td _ngcontent-ng-c53117338=""> 18737 </td>
      //const sno = await rows.nth(i).locator("td").nth(0).innerText()
      try {
            
          const txId = await rows.nth(i).locator("td.ant-table-cell").nth(1).innerText()
          //.locator("div.truncate-ellipsis").innerText() //.locator("a").getAttribute("href")
          console.log('TxtId ' + txId)
      }
      catch(err)
      {
          console.log('Print error ' + err)
      }
  }

  return {success: true}


}

/*
run().catch((err) => {
  console.error('Error:', err);
});*/