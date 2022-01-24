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
const graphql_1 = require("graphql");
const auth_1 = __importDefault(require("../../../services/auth"));
const jwt_1 = __importDefault(require("../../auth/jwt"));
const authServices = new auth_1.default();
const jwt = new jwt_1.default();
exports.default = {
    type: graphql_1.GraphQLString,
    description: 'Login of the user and returns the token',
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield authServices.loginUser(args.username, args.password);
            return jwt.generateJWT({ user });
        });
    },
    args: authServices.argsLoginUser,
};
