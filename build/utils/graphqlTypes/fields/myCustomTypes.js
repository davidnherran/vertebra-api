"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodesTypes = exports.CharactersTypes = exports.LocationTypes = void 0;
const graphql_1 = require("graphql");
exports.LocationTypes = new graphql_1.GraphQLObjectType({
    name: 'LocationTypes',
    description: 'location data',
    fields: {
        value: {
            type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                name: 'objectLocation',
                fields: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    dimension: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    residents: {
                        type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
                    },
                    url: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    created: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                },
            })),
        },
        message: { type: graphql_1.GraphQLString },
    },
});
exports.CharactersTypes = new graphql_1.GraphQLObjectType({
    name: 'CharactersTypes',
    description: 'charaters data',
    fields: {
        value: {
            type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                name: 'objectCharacters',
                fields: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    status: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    specie: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    gender: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    origin: {
                        type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLObjectType({
                            name: 'objectOrigin',
                            fields: {
                                name: { type: graphql_1.GraphQLString },
                                url: { type: graphql_1.GraphQLString },
                            },
                        })),
                    },
                    location: {
                        type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLObjectType({
                            name: 'objectLocationOfCharacter',
                            fields: {
                                name: { type: graphql_1.GraphQLString },
                                url: { type: graphql_1.GraphQLString },
                            },
                        })),
                    },
                    image: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    episode: {
                        type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
                    },
                    url: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    created: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                },
            })),
        },
        message: { type: graphql_1.GraphQLString },
    },
});
exports.EpisodesTypes = new graphql_1.GraphQLObjectType({
    name: 'EpisodesTypes',
    description: 'episodes data',
    fields: {
        value: {
            type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                name: 'objectEpisodes',
                fields: {
                    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    air_date: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    episode: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    characters: {
                        type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
                    },
                    url: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    created: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                },
            })),
        },
        message: { type: graphql_1.GraphQLString },
    },
});
