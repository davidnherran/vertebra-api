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
    get GetArgsDelete() {
        return {
            id: { type: graphql_1.GraphQLInt },
            controller: { type: graphql_1.GraphQLString },
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
                                name: 'objectorigincreate',
                                fields: {
                                    name: { type: graphql_1.GraphQLString },
                                    url: { type: graphql_1.GraphQLString },
                                },
                            }),
                        },
                        location: {
                            type: new graphql_1.GraphQLInputObjectType({
                                name: 'objectlocationcreate',
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
    get getArgsUpdate() {
        return {
            controller: { type: graphql_1.GraphQLString },
            locations: {
                type: new graphql_1.GraphQLInputObjectType({
                    name: 'UpdateLocationArgs',
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
                    name: 'UpdateEpisodesArgs',
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
                    name: 'UpdateCharacterArgs',
                    fields: {
                        name: { type: graphql_1.GraphQLString },
                        type: { type: graphql_1.GraphQLString },
                        status: { type: graphql_1.GraphQLString },
                        species: { type: graphql_1.GraphQLString },
                        gender: { type: graphql_1.GraphQLString },
                        origin: {
                            type: new graphql_1.GraphQLInputObjectType({
                                name: 'objectoriginupdate',
                                fields: {
                                    name: { type: graphql_1.GraphQLString },
                                    url: { type: graphql_1.GraphQLString },
                                },
                            }),
                        },
                        location: {
                            type: new graphql_1.GraphQLInputObjectType({
                                name: 'objectlocationupdate',
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
            id: { type: graphql_1.GraphQLInt },
        };
    }
    getAll(limit, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.postgresLib.find(controller, limit);
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
            return { value: data, message: `${controller} data` };
        });
    }
    delete(id, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedData = yield this.postgresLib.delete(controller, id);
            return deletedData;
        });
    }
    update(id, controller, newdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedData = yield this.postgresLib.update(controller, id, newdata);
            return updatedData;
        });
    }
}
exports.default = AuthServices;
