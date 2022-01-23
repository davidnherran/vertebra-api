// packages
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import jwt from 'jsonwebtoken';


// project
import { envConfig } from './config';
import schema from './utils/schemas/graphql';
import JWT from './utils/auth/jwt';

const app = express();

const context = (req: any) => {
  const jwt = new JWT()
  const { authorization: token } = req.headers;
  return jwt.validateToken(token)
};

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: envConfig.dev,
    customFormatErrorFn(err) {
      return {
        message: err.message,
      };
    },
    context: () => context(req),
  }))
);

app.listen(envConfig.port, () =>
  console.log(`🚀 server listening on port ${envConfig.port}`)
);
