import { program } from 'commander';
import { prompt } from 'inquirer';
import rdl from 'readline';
import process from 'process';

const std = process.stdout;

/* class Spinner {
  spin(concat: string) {
    process.stdout.write('\x1B[?25l');

    const spinners = [
      "⢹",
			"⢺",
			"⢼",
			"⣸",
			"⣇",
			"⡧",
			"⡗",
			"⡏"
    ];

    let index = 0;

    setInterval(() => {
      let line = spinners[index];

      if (line === undefined) {
        index = 0;
        line = spinners[index];
      }

      std.write(`${line} ${concat}`);

      rdl.cursorTo(std, 0);

      index = index >= spinners.length ? 0 : index + 1;
    }, 80);
  }
}
 */
program
  .version('0.0.1')
  .description('vertebra technical test database migration');

program.command('migration').action(async () => {
  //const spinners = new Spinner();
  //spinners.spin('cargando');
});

program.parse();
