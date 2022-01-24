import { Pool } from 'pg';
import { getCharacterFunction } from './getCharacters';

export const createTableCharacters = (pool: Pool) => {
  pool
    .query(
      `CREATE TABLE characters(
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
        )`
    )
    .then((res) => {
      getCharacterFunction(pool);
    })
};
