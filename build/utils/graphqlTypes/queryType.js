"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = new graphql_1.GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        hello: {
            type: graphql_1.GraphQLString,
            description: "return a string",
            resolve: () => 'hello world'
        }
    }
});
