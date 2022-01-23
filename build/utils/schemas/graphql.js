"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const queryType_1 = __importDefault(require("../graphqlTypes/queryType"));
const mutationType_1 = __importDefault(require("../graphqlTypes/mutationType"));
exports.default = new graphql_1.GraphQLSchema({
    query: queryType_1.default,
    mutation: mutationType_1.default
});
