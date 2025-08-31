"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = insertData;
exports.updateData = updateData;
exports.getMySQLDateNow = getMySQLDateNow;
const db_1 = require("./db");
// Async function to insert data
async function insertData(code, name, logoUrl, discount, minAmt, maxAmt, country, denominations) {
    console.log('token: ' + name);
    let conn;
    try {
        conn = await db_1.pool.getConnection();
        const insertQuery = `
    INSERT INTO mmc_billers (biller_code,biller_name,biller_category,biller_logo,status,
      agent_commission,service_provider,min_amt,max_amt,amount_type,country_code,entity_code,denominations,del_flg)
      VALUES (?, ?, ?, ?, ?,
         ?, ?,?,?, ?,?,?,?,? )
    `;
        //const id = symbol + close_date;
        const values = [code, name, 'Gift Card', logoUrl, 'Active',
            discount, 'GIFT_CARD', minAmt, maxAmt, 'RANGE', country, 'H2P', denominations, 'N'
        ]; // Replace with your actual data
        //const [resultx] = await pool.execute(insertQuery, values);
        const [resultx] = await conn.execute(insertQuery, values);
        console.log('coin inserted:', resultx);
    }
    catch (err) {
        console.error('Error inserting data:', err);
    }
    finally {
        if (conn)
            conn.release();
    }
}
async function updateData(name, logoUrl) {
    console.log('token: ' + name);
    let conn;
    try {
        conn = await db_1.pool.getConnection();
        const insertQuery = `
    UPDATE mmc_billers SET biller_logo = ? WHERE biller_name = ?`;
        //const id = symbol + close_date;
        const values = [logoUrl, name]; // Replace with your actual data
        //const [resultx] = await pool.execute(insertQuery, values);
        const [resultx] = await conn.execute(insertQuery, values);
        console.log('coin update:', resultx);
    }
    catch (err) {
        console.error('Error inserting data:', err);
    }
    finally {
        if (conn)
            conn.release();
    }
}
function getMySQLDateNow() {
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
