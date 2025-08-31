import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { fetchchaintran } from './tronscan-txn'


dotenv.config();
const PORT = process.env._PORT;
//const API_KEY = process.env.API_KEY
//const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const origins = process.env.CORS_ORIGIN

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

  app.post('/chaintrans', async (req, res) => {
    try {
  
      const authHeader = req.headers['authorization']; // lowercase key
      const sourceCode = req.headers['x-source-code'];
      const clientId = req.headers['x-client-id'];
      const clientSecret = req.headers['x-client-secret'];
  
      console.log('header ' + sourceCode + ' ' + clientId)
      const xClientId = process.env.X_CLIENT_ID
      const xClientSecret = process.env.X_CLIENT_SECRET;
      const xSourceCode = process.env.X_SOURCE_CODE;
  
      console.log('source code ' + xSourceCode + ' ' + xClientId)

      const { chromeUrl,chainUrl } = req.body;
      
      const response = await fetchchaintran(chainUrl,chromeUrl)
  
      res.json(response)
    
      //res.json(successResponse(response))
    } catch (error) {
      console.log(`error fetch onchain tran `)
      res.status(500).json({success:false,error:'error fetch onchain tran ' + error})
    }
  })




