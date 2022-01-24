"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableUsers = void 0;
const pg_1 = require("pg");
const createTableCharacters_1 = require("./createTableCharacters");
const createTableUsers = (username, password) => {
    const pool = new pg_1.Pool({
        user: username,
        password,
        port: 5432,
        host: 'localhost',
        database: 'vertebra_technical_test',
    });
    pool
        .query(`create table users(
            id serial primary key,
            username text,
            password text,
            displayName text
          )`)
        .then((res) => {
        (0, createTableCharacters_1.createTableCharacters)(pool);
    });
};
exports.createTableUsers = createTableUsers;
