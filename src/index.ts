// packages
import express, { Request } from 'express';
import { graphqlHTTP } from 'express-graphql';

// project
import { envConfig } from './config';
import schema from './utils/schemas/graphql';
import JWT from './utils/auth/jwt';

const app = express();

const context = (req: Request) => {
  const jwt = new JWT();
  const { authorization: token } = req.headers;
  return jwt.validateToken(token!);
};

app.use(
  '/graphql',
  graphqlHTTP((req) => {
    return {
      schema,
      graphiql: envConfig.dev,
      customFormatErrorFn(err) {
        return {
          message: err.message,
        };
      },
      context: () => context(req as Request),
    };
  })
);

app.listen(envConfig.port, () =>
  console.log(`🚀 server listening on port ${envConfig.port}`)
);
