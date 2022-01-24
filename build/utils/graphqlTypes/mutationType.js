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
const fields_1 = require("./fields");
const auth_1 = __importDefault(require("../../services/auth"));
const authService = new auth_1.default();
exports.default = new graphql_1.GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type',
    fields: {
        register: fields_1.register,
        login: fields_1.login,
        create: fields_1.create,
        delete: fields_1.deleteCrud,
        update: fields_1.update,
        updateUsername: fields_1.updateUsername,
        updatePassword: fields_1.updatePassword,
        deleteUser: {
            type: graphql_1.GraphQLString,
            description: 'delete user',
            resolve(_, _a, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    const auth = context();
                    if (!auth.user)
                        throw new Error('UNHAUTORIZED');
                    yield authService.deleteUser(auth.user);
                    return `user with identifier ${auth.user.id} and username ${auth.user.username} removed`;
                });
            },
        },
    },
});
