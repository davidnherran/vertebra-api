"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fields_1 = require("./fields");
exports.default = new graphql_1.GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type',
    fields: {
        register: fields_1.register,
        login: fields_1.login,
        create: fields_1.create,
        delete: fields_1.deleteCrud,
        update: fields_1.update,
    },
});
