"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartPool = exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create MySQL connection pool
// Connection Pool
const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 30000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};
exports.pool = promise_1.default.createPool(poolConfig);
const restartPool = async () => {
    try {
        await exports.pool.end();
        // Recreate pool
        exports.pool = promise_1.default.createPool(poolConfig);
        console.log('Pool restarted');
    }
    catch (error) {
        console.error('Pool restart failed:', error);
    }
};
exports.restartPool = restartPool;
// Add pool monitoring
exports.pool.on('connection', (connection) => {
    console.log('New connection established as id ' + connection.threadId);
});
// Check pool status
console.log('Pool config:', exports.pool.config);
