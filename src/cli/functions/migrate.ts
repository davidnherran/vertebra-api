import { prompt } from 'inquirer';
import { Pool } from 'pg';

const getCredentials = async () => {
  const dataConnection = await prompt([
    {
      type: 'input',
      message: 'Username',
      name: 'username',
    },
    {
      type: 'password',
      message: 'Password',
      name: 'password',
    },
  ]);
  return dataConnection;
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
      client
        .query('create database vertebra_technical_test')
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(`database vertebra_technical_test already exist`)
          pool.end();
        });
    })
    .catch((err) => {
      console.log(err);
      console.log(
        `password authentication failed for user ${username}, try again!`
      );
      return true;
    });
};
