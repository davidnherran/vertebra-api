"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableLocation = void 0;
const getLocations_1 = require("./getLocations");
const createTableLocation = (pool) => {
    pool
        .query(`CREATE TABLE locations(
        id serial primary key,
        name text,
        type text,
        dimension text,
        residents text[],
        url text,
        created text
      )`)
        .then((res) => {
        (0, getLocations_1.getLocationsFunction)(pool);
    });
};
exports.createTableLocation = createTableLocation;
