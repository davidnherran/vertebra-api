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
const codes_1 = require("../../handlerErrors/codes");
const service = new service_1.default();
exports.default = {
    type: new graphql_1.GraphQLObjectType({
        name: 'UpdatedCharacterOrEpisodeOrLocation',
        fields: {
            idUpdated: { type: graphql_1.GraphQLInt },
            affected: { type: graphql_1.GraphQLInt },
            message: { type: graphql_1.GraphQLString },
        },
    }),
    resolve(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = context();
            if (!auth.user)
                throw new Error(codes_1.UNAUTHORIZED);
            const updated = yield service.update(args.id, args.controller, args[args.controller]);
            return updated;
        });
    },
    args: service.getArgsUpdate,
};
