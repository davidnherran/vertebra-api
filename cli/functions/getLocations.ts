import { Pool } from 'pg';
import get from '../fetch';
import { createTableEpisodes } from './createTableEpisodes';
export const getLocationsFunction = (pool: Pool) =>
  get('https://rickandmortyapi.com/api/location')
    .then((res) => {
      return Promise.all(
        res.map(async (data) => {
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
          return await pool.query(text, values);
        })
      );
    })
    .then((res) => createTableEpisodes(pool));
