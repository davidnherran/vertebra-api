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
exports.getLocationsFunction = void 0;
const fetch_1 = __importDefault(require("../fetch"));
const createTableEpisodes_1 = require("./createTableEpisodes");
const getLocationsFunction = (pool) => (0, fetch_1.default)('https://rickandmortyapi.com/api/location')
    .then((res) => {
    return Promise.all(res.map((data) => __awaiter(void 0, void 0, void 0, function* () {
        delete data.id;
        const values = Object.values(data);
        const text = `insert into locations(
          name,
          type,
          dimension,
          residents,
          url,
          created
      ) values($1, $2, $3, $4, $5, $6)`;
        return yield pool.query(text, values);
    })));
})
    .then((res) => (0, createTableEpisodes_1.createTableEpisodes)(pool));
exports.getLocationsFunction = getLocationsFunction;
