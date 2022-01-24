import {
  GraphQLObjectType,
  GraphQLUnionType,
} from 'graphql';
import Service from '../../services/service';
import { CharactersTypes, LocationTypes, EpisodesTypes } from './fields/myCustomTypes';

const service = new Service();
export default new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    get: {
      type: new GraphQLUnionType({
        name: 'UnionTypesCrud',
        types: [LocationTypes, CharactersTypes, EpisodesTypes],
        resolveType(value) {
          console.log(value.message);
          if (value.message === 'locations data') return 'LocationTypes';
          if (value.message === 'characters data') return 'CharactersTypes';
          if (value.message === 'episodes data') return 'EpisodesTypes';
        },
      }),
      description: 'Filtered location list',
      async resolve(_: any, args: Get) {
        return await service.getAll(args.limit, args.controller);
      },
      args: service.getArgs,
    },
  },
});
