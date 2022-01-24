import { prompt } from 'inquirer';
import { Pool } from 'pg';
import { envConfig } from '../config';
import { program } from 'commander';
import Spinner from './loaders';
const spinner = new Spinner();
import migrate from './functions/migrate';

program
  .version('0.0.1')
  .description('Terminal application for Postgresql database migration');

program
  .command('migrate')
  .description('controller database')
  .option('--delete', 'delete database')
  .action(async (action) => {
    if (action.delete) {
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
        {
          type: 'input',
          message: 'Database name',
          name: 'database_name',
        },
      ]);
      const { username, password, database_name } = dataConnection;

      const pool = new Pool({
        user: username,
        password,
        port: 5432,
        host: 'localhost',
      });

      pool.query(`drop database ${database_name}`, (err, res) => {
        if (err) {
          console.log(
            `An error occurred while trying to delete the named database ${database_name}`
          );
        } else {
          console.log(`${database_name} database deleted`)
        }
      });
    } else {
      const error = await migrate();
      if (error) {
        const error = await migrate();
        if (error) {
          const error = await migrate();
          console.log(error);
        }
      }
    }
  });

program.parse(process.argv);
