import { GraphQLUnionType } from 'graphql';
import Service from '../../../services/service';
import { UNAUTHORIZED } from '../../handlerErrors/codes';
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
  async resolve(_: undefined, args: Get, context: Function) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    return await service.getAll(args.limit, args.controller);
  },
  args: service.getArgsGetAll,
};
