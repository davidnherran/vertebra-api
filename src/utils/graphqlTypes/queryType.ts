import { GraphQLObjectType } from 'graphql';
import { get, getById } from './fields';
export default new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    get,
    getById,
  },
});
