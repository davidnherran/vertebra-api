"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsResponse = void 0;
const graphql_1 = require("graphql");
exports.LocationsResponse = new graphql_1.GraphQLInputObjectType({
    name: 'LocationsResponse',
    description: '',
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dimension: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        residents: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        url: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        created: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
});
