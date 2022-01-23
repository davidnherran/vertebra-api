"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
class JWT {
    constructor() {
        this.secretKey = config_1.envConfig.jwtSecretKey;
        this.expiresIn = '6h';
    }
    generateJWT({ user }) {
        return jsonwebtoken_1.default.sign({ user }, this.secretKey, {
            expiresIn: this.expiresIn,
        });
    }
}
exports.default = JWT;
