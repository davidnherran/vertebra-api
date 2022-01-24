"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableEpisodes = void 0;
const getEpisodes_1 = require("./getEpisodes");
const createTableEpisodes = (pool) => {
    pool
        .query(`CREATE TABLE episodes(
        id serial primary key,
        name text,
        air_date text,
        episode text,
        characters text[],
        url text,
        created text
      );`)
        .then((res) => {
        (0, getEpisodes_1.getEpisodesFunction)(pool);
    });
};
exports.createTableEpisodes = createTableEpisodes;
