import {
  GraphQLObjectType,
} from 'graphql';
import { register, login } from './fields';

export default new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: {
    register,
    login,
  },
});
