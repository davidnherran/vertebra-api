import { Pool, PoolClient } from 'pg';
import { getCredentials } from './functions/getCredentials';
import { createTableUsers } from './functions/createTableUser';

const createDatabase = (
  client: PoolClient,
  password: string,
  username: string
) => {
  client
    .query('create database vertebra_technical_test')
    .then(() => {
      createTableUsers(username, password);
    })
    .catch((err) => {
      console.log(`database vertebra_technical_test already exist`);
    });
};

export default async () => {
  const dataConnection = await getCredentials();
  const { username, password } = dataConnection;

  const pool = new Pool({
    user: username,
    password,
    port: 5432,
    host: 'localhost',
  });
  return await pool
    .connect()
    .then((client) => {
      createDatabase(client, password, username);
    })
    .catch((err) => {
      console.log(
        `password authentication failed for user ${username}, try again!`
      );
      return true;
    });
};
