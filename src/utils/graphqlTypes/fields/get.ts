import { GraphQLUnionType } from 'graphql';
import Service from '../../../services/service';
import { CharactersTypes, EpisodesTypes, LocationTypes } from './myCustomTypes';

const service = new Service();

export default {
  type: new GraphQLUnionType({
    name: 'GetAllEpisodesOrCharactersOrLocations',
    types: [LocationTypes, CharactersTypes, EpisodesTypes],
    resolveType(value) {
      if (value.message === 'locations data') return 'LocationTypes';
      if (value.message === 'characters data') return 'CharactersTypes';
      if (value.message === 'episodes data') return 'EpisodesTypes';
    },
  }),
  description: 'Filtered location list',
  async resolve(_: any, args: Get) {
    return await service.getAll(args.limit, args.controller);
  },
  args: service.getArgsGetAll,
};
