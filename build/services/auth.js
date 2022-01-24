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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const graphql_1 = require("graphql");
const postgresLib_1 = require("../lib/postgresLib");
const codes_1 = require("../utils/handlerErrors/codes");
class AuthServices {
    constructor() {
        this.postgresLib = new postgresLib_1.PostgresLib();
    }
    get argsCreateUser() {
        return {
            username: {
                type: graphql_1.GraphQLString,
            },
            password: {
                type: graphql_1.GraphQLString,
            },
            displayName: {
                type: graphql_1.GraphQLString,
            },
        };
    }
    get argsLoginUser() {
        return {
            username: {
                type: graphql_1.GraphQLString,
            },
            password: {
                type: graphql_1.GraphQLString,
            },
        };
    }
    createUser(username, password, displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const createdUser = yield this.postgresLib.registerUser(username, hashedPassword, displayName);
            return createdUser;
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.postgresLib.existUser(username);
            if (!user) {
                return codes_1.INCORRECT_USERNAME;
            }
            if (!(yield bcryptjs_1.default.compare(password, user.password))) {
                return codes_1.INCORRECT_PASSWORD;
            }
            delete user.password;
            return user;
        });
    }
    getUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.postgresLib.existUser(username);
            return user;
        });
    }
}
exports.default = AuthServices;
