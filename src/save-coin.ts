
import { pool } from './db';


// Async function to insert data
export async function insertData(symbol: string ,name: string, mintAddr: string, 
  contractAddr: string, decimalNo: number, chain: string, logoUrl: string) {

  console.log('token: ' + symbol);
  
  try {

    
    const insertQuery = `
      INSERT INTO mmc_coin_chains (coin,name,mint_address,contract_address,chain,status,decimal_no,logo_url)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;


    //const id = symbol + close_date;
    const values = [symbol,name,mintAddr,contractAddr,chain,'Active',decimalNo,logoUrl]; // Replace with your actual data
    const [resultx] = await pool.execute(insertQuery, values);
  console.log('coin inserted:', resultx);

  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    // connection.end();
  }
}



export function getMySQLDateNow(): string {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
  
    const hours = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');
    const seconds = `${now.getSeconds()}`.padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

//insertData();