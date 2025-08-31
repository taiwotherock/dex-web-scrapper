
import { chromium } from 'playwright';



async function run() {
 
    //connect the existing browser using Websocket debugger address
const browser = await chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/49b6b0ed-a8d5-4b30-9a23-b309ec040f41');
const defaultContext =  browser.contexts()[0] //get the first opened tab
const page = defaultContext.pages()[0];

/**
 * type and test the code snippet after this line
 */
//await page.goto('https://dexscreener.com/solana/meteora')
await page.goto('https://www.upwork.com/nx/find-work/most-recent'); ///solana/raydium')
//await expect(page).toHaveURL(/amazon/)
console.log("processing")
const title =await page.title()
console.log("Title " + title)

//let links = page.locator("a.ds-dex-table-row");
//const count = await links.count();
//console.log("count is " + count); 

let tds = page.locator("td._ngcontent-ng-c53117338");


 //page.locator("div.job-tile-list") //air3-grid-container") //threadListCard
//await table.waitFor();
try {
  let table = await page.locator('.air3-card-hover')
  let count = await table.count();

  //air3-card-section air3-card-hover p-4 px-2x px-md-4x

  console.log("count " + count) 
let i =0;

  for (i=0; i<count; i++)
  {
      //i++;
      try {
        const title = await table.nth(i).locator(".air3-link").first().innerText()
        // const name = await rows.nth(i).locator(".relative").first().locator("img").getAttribute("alt")
        console.log( i + ' Title ' + title)
  
        }
        catch(err)
        {
           console.log(err)
        }

  }
  //table.waitFor({ state: 'visible', timeout: 30000 });

  //console.log("data " + table.innerHTML() + " " + table.innerText())
} catch (e) {
  console.log("Element not found in time, trying again...");
  //await page.reload();
  //let table = await page.locator('div.air3-card-sections')
  //table.waitFor({ state: 'visible', timeout: 60000 });
}

  /*
let rows = await table.locator(".job-tile");
let count = await rows.count();
console.log("count " + count) 
let i =0;

  for (i=0; i<count; i++)
  {
      //i++;
      //<td _ngcontent-ng-c53117338=""> 18737 </td>
      //const sno = await rows.nth(i).locator("td").nth(0).innerText()
      try {
      const title = await rows.nth(i).locator(".air3-link").first().innerText()
      // const name = await rows.nth(i).locator(".relative").first().locator("img").getAttribute("alt")
      console.log('Title ' + title)

      }
      catch(err)
      {
         console.log(err)
      }


  }*/

  //browser.close()


}


run().catch((err) => {
  console.error('Error:', err);
});