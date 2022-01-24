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
class LocationsArr {
    constructor() {
        (this.value = []), (this.message = '');
    }
}
class AuthServices {
    constructor() {
        this.postgresLib = new postgresLib_1.PostgresLib();
    }
    get getArgs() {
        return {
            limit: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLInt),
            },
            controller: {
                type: graphql_1.GraphQLString,
            },
        };
    }
    getAll(limit, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(controller);
            const filterData = yield this.postgresLib.get(controller, limit);
            return { value: filterData, message: `${controller} data` };
        });
    }
}
exports.default = AuthServices;
