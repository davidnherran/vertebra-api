import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import Service from '../../services/service';
import { get, create, getById } from './fields';
import {
  CreatedCharacter,
  CreatedEpisode,
  CreatedLocation,
  GetByIdCharacter,
  GetByIdEpisode,
  GetByIdLocationType,
} from './fields/myCustomTypes';
const service = new Service();
export default new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    get,
    create,
    getById,
  },
});
