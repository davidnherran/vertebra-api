"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableCharacters = void 0;
const getCharacters_1 = require("./getCharacters");
const createTableCharacters = (pool) => {
    pool
        .query(`CREATE TABLE characters(
            id serial primary key,
            name text,
            status text,
            species text,
            type text,
            gender text,
            origin json,
            location json,
            image text,
            episode text[],
            url text,
            created text
        )`)
        .then((res) => {
        (0, getCharacters_1.getCharacterFunction)(pool);
    });
};
exports.createTableCharacters = createTableCharacters;
