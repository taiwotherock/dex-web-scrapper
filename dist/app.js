"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const tronscan_txn_1 = require("./tronscan-txn");
dotenv_1.default.config();
const PORT = process.env._PORT;
//const API_KEY = process.env.API_KEY
//const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const origins = process.env.CORS_ORIGIN;
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
        console.log('header ' + sourceCode + ' ' + clientId);
        const xClientId = process.env.X_CLIENT_ID;
        const xClientSecret = process.env.X_CLIENT_SECRET;
        const xSourceCode = process.env.X_SOURCE_CODE;
        console.log('source code ' + xSourceCode + ' ' + xClientId);
        const { chromeUrl, chainUrl } = req.body;
        const response = await (0, tronscan_txn_1.fetchchaintran)(chainUrl, chromeUrl);
        res.json(response);
        //res.json(successResponse(response))
    }
    catch (error) {
        console.log(`error fetch onchain tran `);
        res.status(500).json({ success: false, error: 'error fetch onchain tran ' + error });
    }
});
