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
const auth_1 = __importDefault(require("../../services/auth"));
const jwt_1 = __importDefault(require("../auth/jwt"));
const codes_1 = require("../handlerErrors/codes");
const authService = new auth_1.default();
const jwt = new jwt_1.default();
exports.default = new graphql_1.GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type',
    fields: {
        register: {
            type: graphql_1.GraphQLString,
            description: 'Register new user',
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { username, password, displayName } = args;
                    const createdUser = yield authService.createUser(username, password, displayName);
                    if (createdUser === codes_1.USERNAME_IS_ALREADY_IN_USE)
                        return codes_1.USERNAME_IS_ALREADY_IN_USE;
                    return jwt.generateJWT({ user: createdUser });
                });
            },
            args: authService.argsCreateUser,
        },
    },
});
