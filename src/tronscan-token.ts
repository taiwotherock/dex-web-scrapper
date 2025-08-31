import { chromium } from 'playwright';
import { insertData } from './save-coin';

async function run() {
 
    //connect the existing browser using Websocket debugger address
const browser = await chromium.connectOverCDP('ws://127.0.0.1:9242/devtools/browser/21c1542d-cba3-4186-9a94-eb2ada6db3c5');
const defaultContext =  browser.contexts()[0] //get the first opened tab
const page = defaultContext.pages()[0];

/**
 * type and test the code snippet after this line
 */
//await page.goto('https://dexscreener.com/solana/meteora')
await page.goto('https://tronscan.org/#/token20/TU3kjFuhtEo42tsCBtfYUAZxoqQ4yuSLQ5'); ///solana/raydium')
//await expect(page).toHaveURL(/amazon/)
console.log("processing")
const title =await page.title()
console.log("Title " + title)

//let links = page.locator("a.ds-dex-table-row");
//const count = await links.count();
//console.log("count is " + count); 
/*
<a class="text-truncate address-link " href="#/contract/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/code"><div class="d-flex align-items-center"><span class="flagIcon"><svg class="icon tron-icon contract-icon" aria-hidden="true"><use xlink:href="#icon-icon-sc"></use></svg></span><div class="ellipsis_box contract_ellipsis_box">
<div class="line-ellipsis">TR7NHqjeKQxGTCi8q8ZY4pL8otS</div><div>zgjLj6t</div></div></div></a>
*/

let imgUrl = await page.locator("img.logo-img").getAttribute('src');
console.log("logo url " + imgUrl); 
let logo = imgUrl ?? '';

const divBasic = await page.locator("div.token-base-wrap");

let trItem = await divBasic.locator("tr.info-item").nth(3)
console.log("inner " + trItem.innerHTML())

let decimalNo = await (await trItem.locator("td").innerHTML()).replace("<span>","").replace("</span>","").trim()
console.log("inner " + decimalNo)

var titles = title.split('|')
console.log('name ' + titles[1])
var names

var name = titles[1].trim()
var symbol = titles[1].trim();

if(titles[1].indexOf('(') > 0)
{
    names = titles[1].split('(')
    symbol = names[1].replace("(","").trim()
    name = names[0].replace("(","").trim()
}


//console.log('name ' + names[0].trim() + " " + symbol)

const divAddr = await divBasic.locator("a.address-link").nth(0).getAttribute('href')
const divAddr2 = divAddr ?? ''
console.log('href: ' + divAddr)
const contractAddr = divAddr2.split('/')[2]
console.log('contractAddr: ' + contractAddr)

insertData(symbol,name,'',contractAddr,Number(decimalNo),'TRON',logo)

browser.close()



//const count = await links.count();



//await links.nth(0).click();

//for (const li of await page.getByRole('listitem').all())
  //await li.click();


/**
 * don't close the browser or page instance
 */



}


run().catch((err) => {
  console.error('Error:', err);
});