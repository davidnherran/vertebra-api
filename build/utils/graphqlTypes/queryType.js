"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const service_1 = __importDefault(require("../../services/service"));
const fields_1 = require("./fields");
const service = new service_1.default();
exports.default = new graphql_1.GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        get: fields_1.get,
        create: fields_1.create,
        getById: fields_1.getById,
    },
});
