
import { pool } from './db';


// Async function to insert data
export async function insertData(symbol: string ,market_cap:number,liquidity: number,close_price:number,
    close_date: string ,volume: number) {

  console.log('token: ' + symbol);
  
  try {

    
    const insertQuery = `
      INSERT INTO bk_price_logs (id,symbol,market_cap,liquidity,close_price,close_date,volume,other_data)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;

    const id = symbol + close_date;
    const values = [id,symbol,market_cap,liquidity,close_price,close_date,volume,'DEX']; // Replace with your actual data
    const [resultx] = await pool.execute(insertQuery, values);
  console.log('User inserted:', resultx);

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