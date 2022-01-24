import { Pool } from 'pg';
import { getEpisodesFunction } from './getEpisodes';
export const createTableEpisodes = (pool: Pool) => {
  pool
    .query(
      `CREATE TABLE episodes(
        id serial primary key,
        name text,
        air_date text,
        episode text,
        characters text[],
        url text,
        created text
      );`
    )
    .then((res) => {
      getEpisodesFunction(pool);
    })
};
