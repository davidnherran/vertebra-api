import { GraphQLUnionType } from 'graphql';
import Service from '../../../services/service';

const service = new Service();
import {
  CreatedCharacter,
  CreatedEpisode,
  CreatedLocation,
} from './myCustomTypes';

export default {
  type: new GraphQLUnionType({
    name: 'CreateEpisodeOrCharacterOrLocation',
    types: [CreatedLocation, CreatedCharacter, CreatedEpisode],
    resolveType(value) {
      if (value.message === 'locations created') return 'CreatedLocation';
      if (value.message === 'characters created') return 'CreatedCharacter';
      if (value.message === 'episodes created') return 'CreatedEpisode';
    },
  }),
  async resolve(_: any, args: any) {
    console.log(args[args.controller]);
    const created = await service.create(
      args[args.controller],
      args.controller
    );
    return created;
  },
  args: service.getArgsCreate,
};
