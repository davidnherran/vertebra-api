import { prompt } from 'inquirer';
import { Pool } from 'pg';
import { program } from 'commander';
import migrate from './migrate';

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
      ]);
      const { username, password } = dataConnection;

      const pool = new Pool({
        user: username,
        password,
        port: 5432,
        host: 'localhost',
      });

      pool.query(`drop database vertebra_technical_test`, (err) => {
        if (err) {
          console.log(
            `An error occurred while trying to delete the named database vertebra_technical_test`
          );
          setImmediate(() => {
            process.exit(0);
          });
        } else {
          console.log(`✅ vertebra_technical_test database deleted`);
          setImmediate(() => {
            process.exit(0);
          });
        }
      });
    } else {
      const error = await migrate();
      if (error) {
        const error = await migrate();
        if (error) {
          await migrate();
          process.exit(0);
        }
      }
    }
  });

program.parse(process.argv);
