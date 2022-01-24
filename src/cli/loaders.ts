import { stderr } from 'process';

export default class Spinner {
  constructor() {}

  spin(text: string) {
    process.stdout.write('c1B[?25l');
    const spiner = ['-', '\\', '|', '/'];
    let index = 0;

    setInterval(() => {
      let line = spiner[index];
      if (line === undefined) {
        index = 0;
        line = spiner[index];
      }

      stderr.write(`${line} ${text}`);

      index = index >= spiner.length ? 0 : index + 1;
    }, 100);
  }
}
