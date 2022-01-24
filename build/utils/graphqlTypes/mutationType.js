"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fields_1 = require("./fields");
const service_1 = __importDefault(require("../../services/service"));
const service = new service_1.default();
class Location {
    constructor() {
        this.id = 0;
        this.name = '';
        this.type = '';
        this.dimension = '';
        this.resident = [''];
        this.url = '';
        this.created = '';
    }
}
class LocationResponse {
    constructor() {
        this.arr = Array();
    }
}
const parseValue = (value) => {
    if (value instanceof LocationResponse) {
        return +value;
    }
};
exports.default = new graphql_1.GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type',
    fields: {
        register: fields_1.register,
        login: fields_1.login,
    },
});
