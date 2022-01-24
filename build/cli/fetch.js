"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fetch = (url) => {
    return (0, axios_1.default)({
        method: 'GET',
        url,
    })
        .then((res) => {
        return res.data.results;
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.default = (url) => Promise.all([fetch(url), fetch(`${url}?page=2`)]).then((res) => {
    return res.flat();
});
