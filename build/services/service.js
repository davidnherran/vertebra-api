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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const postgresLib_1 = require("../lib/postgresLib");
class AuthServices {
    constructor() {
        this.postgresLib = new postgresLib_1.PostgresLib();
    }
    get getArgsGetById() {
        return {
            id: { type: graphql_1.GraphQLInt },
            controller: {
                type: graphql_1.GraphQLString,
            },
        };
    }
    get getArgsGetAll() {
        return {
            limit: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLInt),
            },
            controller: {
                type: graphql_1.GraphQLString,
            },
        };
    }
    get getArgsCreate() {
        return {
            controller: { type: graphql_1.GraphQLString },
            locations: {
                type: new graphql_1.GraphQLInputObjectType({
                    name: 'CreateLocation',
                    fields: {
                        name: { type: graphql_1.GraphQLString },
                        type: { type: graphql_1.GraphQLString },
                        dimension: { type: graphql_1.GraphQLString },
                        residents: {
                            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
                        },
                        url: { type: graphql_1.GraphQLString },
                        created: { type: graphql_1.GraphQLString },
                    },
                }),
            },
            episodes: {
                type: new graphql_1.GraphQLInputObjectType({
                    name: 'CreateEpisodes',
                    fields: {
                        name: { type: graphql_1.GraphQLString },
                        air_date: { type: graphql_1.GraphQLString },
                        episode: { type: graphql_1.GraphQLString },
                        characters: {
                            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
                        },
                        url: { type: graphql_1.GraphQLString },
                        created: { type: graphql_1.GraphQLString },
                    },
                }),
            },
            characters: {
                type: new graphql_1.GraphQLInputObjectType({
                    name: 'CreateCharacter',
                    fields: {
                        name: { type: graphql_1.GraphQLString },
                        type: { type: graphql_1.GraphQLString },
                        status: { type: graphql_1.GraphQLString },
                        species: { type: graphql_1.GraphQLString },
                        gender: { type: graphql_1.GraphQLString },
                        origin: {
                            type: new graphql_1.GraphQLInputObjectType({
                                name: 'objectorigin',
                                fields: {
                                    name: { type: graphql_1.GraphQLString },
                                    url: { type: graphql_1.GraphQLString },
                                },
                            }),
                        },
                        location: {
                            type: new graphql_1.GraphQLInputObjectType({
                                name: 'objectlocationfieldscharacter',
                                fields: {
                                    name: { type: graphql_1.GraphQLString },
                                    url: { type: graphql_1.GraphQLString },
                                },
                            }),
                        },
                        image: { type: graphql_1.GraphQLString },
                        episode: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                        url: { type: graphql_1.GraphQLString },
                        created: { type: graphql_1.GraphQLString },
                    },
                }),
            },
        };
    }
    getAll(limit, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.postgresLib.get(controller, limit);
            return { value: data, message: `${controller} data` };
        });
    }
    create(data, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdData = yield this.postgresLib.create(controller, data);
            return { value: createdData, message: `${controller} created` };
        });
    }
    getById(id, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.postgresLib.findById(controller, id);
            if (!data)
                throw new Error(`ÌDENTIFIER_${id}_NOT_EXIST`);
            return { value: data, message: `${controller} data` };
        });
    }
}
exports.default = AuthServices;
