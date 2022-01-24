import { Pool } from 'pg';
import { getLocationsFunction } from './getLocations';
export const createTableLocation = (pool: Pool) => {
  pool
    .query(
      `CREATE TABLE locations(
        id serial primary key,
        name text,
        type text,
        dimension text,
        residents text[],
        url text,
        created text
      )`
    )
    .then((res) => {
      getLocationsFunction(pool);
    })
};
