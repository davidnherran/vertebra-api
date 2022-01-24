import { Pool } from 'pg';
import get from '../fetch';
export const getEpisodesFunction = (pool: Pool) =>
  get('https://rickandmortyapi.com/api/episode')
    .then((res) => {
      return Promise.all(
        res.map(async (data) => {
          delete data.id;
          const values = Object.values(data);
          const text = `insert into episodes(
          name,
          air_date,
          episode,
          characters,
          url,
          created
      ) values($1, $2, $3, $4, $5, $6)`;
          return await pool.query(text, values);
        })
      );
    })
    .finally(() => {
      setImmediate(() => {
        console.log("✅ created database successfully")
        process.exit(0);
      });
    });
