"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const pg_1 = require("pg");
const getCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataConnection = yield (0, inquirer_1.prompt)([
        {
            type: 'input',
            message: 'Username',
            name: 'username',
        },
        {
            type: 'password',
            message: 'Password',
            name: 'password',
        },
    ]);
    return dataConnection;
});
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataConnection = yield getCredentials();
    const { username, password } = dataConnection;
    const pool = new pg_1.Pool({
        user: username,
        password,
        port: 5432,
        host: 'localhost',
    });
    return yield pool
        .connect()
        .then((client) => {
        client
            .query('create database vertebra_technical_test')
            .then((res) => {
            console.log(res);
            pool.end();
        })
            .catch((err) => {
            console.log(`database vertebra_technical_test already exist`);
            pool.end();
        });
    })
        .catch((err) => {
        console.log(err);
        console.log(`password authentication failed for user ${username}, try again!`);
        return true;
    });
});
