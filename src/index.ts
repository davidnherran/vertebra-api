// packages
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// project
import { envConfig } from './config';
import schema from './utils/schemas/graphql';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(envConfig.port, () =>
  console.log(`🚀 server listening on port ${envConfig.port}`)
);
