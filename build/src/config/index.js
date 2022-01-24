"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.envConfig = {
    port: process.env.PORT || '3000',
    dev: Boolean(((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) !== 'production'),
    cors: process.env.CORS,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecretKey: process.env.JWT_SECRET_KEY
};
