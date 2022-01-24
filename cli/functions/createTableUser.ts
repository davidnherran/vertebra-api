import { Pool } from 'pg';
import { createTableCharacters } from './createTableCharacters';
export const createTableUsers = (username: string, password: string) => {
  const pool = new Pool({
    user: username,
    password,
    port: 5432,
    host: 'localhost',
    database: 'vertebra_technical_test',
  });
  pool
    .query(
      `create table users(
            id serial primary key,
            username text,
            password text,
            displayName text
          )`
    )
    .then((res) => {
      createTableCharacters(pool);
    })
};
