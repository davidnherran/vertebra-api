"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const config_1 = require("./config");
const graphql_1 = __importDefault(require("./utils/schemas/graphql"));
const jwt_1 = __importDefault(require("./utils/auth/jwt"));
const app = (0, express_1.default)();
const context = (req) => {
    const jwt = new jwt_1.default();
    const { authorization: token } = req.headers;
    return jwt.validateToken(token);
};
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req) => {
    return {
        schema: graphql_1.default,
        graphiql: config_1.envConfig.dev,
        customFormatErrorFn(err) {
            return {
                message: err.message,
            };
        },
        context: () => context(req),
    };
}));
app.listen(config_1.envConfig.port, () => console.log(`🚀 server listening on port ${config_1.envConfig.port}`));
