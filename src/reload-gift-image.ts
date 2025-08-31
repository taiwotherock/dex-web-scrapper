import { chromium } from 'playwright';
import { insertData, updateData} from './save-giftcard';

async function run() {
 
    //connect the existing browser using Websocket debugger address
const browser = await chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/21c1542d-cba3-4186-9a94-eb2ada6db3c5');
const defaultContext =  browser.contexts()[0] //get the first opened tab
const page = defaultContext.pages()[0];

/**
 * type and test the code snippet after this line
 */
//await page.goto('https://dexscreener.com/solana/meteora')

let j=100
for(j=1;j<=100;j++)
{
  await page.goto('https://dashboard.reloadly.com/giftcards?page=' + j + '&size=30'); ///solana/raydium')
  //await expect(page).toHaveURL(/amazon/)
  console.log("processing")
  const title =await page.title()
  console.log("Title " + title)

  //let links = page.locator("a.ds-dex-table-row");
  //const count = await links.count();
  //console.log("count is " + count); 

  //let tds = page.locator("td._ngcontent-ng-c53117338");

  let table = page.locator("div.giftcard-list");
  await table.waitFor();
    console.log("data " + table.innerHTML() + " " + table.innerText())
  let rows = await table.locator("div.giftcard-item")
  let count = await rows.count();
  console.log("count " + count) 
  let i =0;

    for (i=0; i<count; i++)
    {
        //i++;
        //<td _ngcontent-ng-c53117338=""> 18737 </td>

        const imgUrl = await rows.nth(i).locator("img").getAttribute("src")
        var logo = imgUrl ?? ''
        const name = await rows.nth(i).locator("p").innerText()
        console.log('imag ' + imgUrl + " " + name)

        updateData(name,logo)

    }
}//for j

browser.close()


} //




run().catch((err) => {
  console.error('Error:', err);
});