"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
class Spinner {
    constructor() { }
    spin(text) {
        process.stdout.write('c1B[?25l');
        const spiner = ['-', '\\', '|', '/'];
        let index = 0;
        setInterval(() => {
            let line = spiner[index];
            if (line === undefined) {
                index = 0;
                line = spiner[index];
            }
            process_1.stderr.write(`${line} ${text}`);
            index = index >= spiner.length ? 0 : index + 1;
        }, 100);
    }
}
exports.default = Spinner;
