import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import Service from '../../services/service';
import { get } from './fields';
import {
  CreatedCharacter,
  CreatedEpisode,
  CreatedLocation,
} from './fields/myCustomTypes';
const service = new Service();
export default new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    get,
    create: {
      type: new GraphQLUnionType({
        name: 'CreateEpisodeOrCharacterOrLocation',
        types: [CreatedLocation, CreatedCharacter, CreatedEpisode],
        resolveType(value) {
          if (value.message === 'locations created') return 'CreatedLocation';
          if (value.message === 'characters created') return 'CreatedCharacter';
          if (value.message === 'episodes created') return 'CreatedEpisode';
          return 'CreatedLocation';
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
    },
  },
});
