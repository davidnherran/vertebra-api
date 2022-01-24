import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import { register, login, create, delete as deleteCrud } from './fields';
import Service from '../../services/service';
const service = new Service();

export default new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: {
    register,
    login,
    create,
    delete: deleteCrud,
  },
});
