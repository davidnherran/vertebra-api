"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
;
passport_1.default.use(new passport_http_bearer_1.Strategy((jwtPayload, done) => {
    console.log(jwtPayload);
    done(null, { valor: '' });
}));
