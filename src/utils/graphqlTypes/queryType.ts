import { GraphQLObjectType, GraphQLString } from 'graphql';
import { login } from './fields';

export default new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    login,
  },
});
