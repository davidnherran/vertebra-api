"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const config_1 = require("./config");
const graphql_1 = __importDefault(require("./utils/schemas/graphql"));
const app = (0, express_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema: graphql_1.default,
}));
app.listen(config_1.envConfig.port, () => console.log(`🚀 server listening on port ${config_1.envConfig.port}`));
