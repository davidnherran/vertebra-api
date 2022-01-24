import { Pool } from 'pg';
import get from '../fetch';
import { createTableLocation } from './createTableLocation';
export const getCharacterFunction = (pool: Pool) =>
  get('https://rickandmortyapi.com/api/character')
    .then((res) => {
      Promise.all(
        res.map(async (data) => {
          delete data.id;
          const values = Object.values(data);
          const text = `insert into characters(
        name,
        status,
        species,
        type,
        gender,
        origin,
        location,
        image,
        episode,
        url,
        created
      ) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
          await pool.query(text, values);
        })
      );
    })
    .then((res) => createTableLocation(pool));
