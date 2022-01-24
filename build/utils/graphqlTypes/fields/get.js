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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const service_1 = __importDefault(require("../../../services/service"));
const myCustomTypes_1 = require("./myCustomTypes");
const service = new service_1.default();
exports.default = {
    type: new graphql_1.GraphQLUnionType({
        name: 'GetAllEpisodesOrCharactersOrLocations',
        types: [myCustomTypes_1.LocationTypes, myCustomTypes_1.CharactersTypes, myCustomTypes_1.EpisodesTypes],
        resolveType(value) {
            if (value.message === 'locations data')
                return 'LocationTypes';
            if (value.message === 'characters data')
                return 'CharactersTypes';
            if (value.message === 'episodes data')
                return 'EpisodesTypes';
        },
    }),
    description: 'Filtered location list',
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield service.getAll(args.limit, args.controller);
        });
    },
    args: service.getArgsGetAll,
};
