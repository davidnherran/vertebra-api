"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fields_1 = require("./fields");
exports.default = new graphql_1.GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        get: fields_1.get,
        getById: fields_1.getById,
    },
});
