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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const pg_1 = require("pg");
const commander_1 = require("commander");
const migrate_1 = __importDefault(require("./migrate"));
commander_1.program
    .version('0.0.1')
    .description('Terminal application for Postgresql database migration');
commander_1.program
    .command('migrate')
    .description('controller database')
    .option('--delete', 'delete database')
    .action((action) => __awaiter(void 0, void 0, void 0, function* () {
    if (action.delete) {
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
        const { username, password } = dataConnection;
        const pool = new pg_1.Pool({
            user: username,
            password,
            port: 5432,
            host: 'localhost',
        });
        pool.query(`drop database vertebra_technical_test`, (err) => {
            if (err) {
                console.log(`An error occurred while trying to delete the named database vertebra_technical_test`);
                setImmediate(() => {
                    process.exit(0);
                });
            }
            else {
                console.log(`✅ vertebra_technical_test database deleted`);
                setImmediate(() => {
                    process.exit(0);
                });
            }
        });
    }
    else {
        const error = yield (0, migrate_1.default)();
        if (error) {
            const error = yield (0, migrate_1.default)();
            if (error) {
                yield (0, migrate_1.default)();
                process.exit(0);
            }
        }
    }
}));
commander_1.program.parse(process.argv);
