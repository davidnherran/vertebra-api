import { GraphQLUnionType } from 'graphql';
import {
  GetByIdCharacter,
  GetByIdEpisode,
  GetByIdLocationType,
} from './myCustomTypes';
import Service from '../../../services/service';
const service = new Service();

export default {
  type: new GraphQLUnionType({
    name: 'GetByIdEpisodeOrCharacterOrLocation',
    types: [GetByIdLocationType, GetByIdCharacter, GetByIdEpisode],
    async resolveType(value) {
      if (value.message === 'locations data') return 'GetByIdLocation';
      if (value.message === 'characters data') return 'GetByIdCharacter';
      if (value.message === 'episodes data') return 'GetByIdEpisode';
    },
  }),
  async resolve(_: any, args: any, context: any) {
    const auth = context();
    if (!auth.user) throw new Error('UNAHUTORIZED');
    const data = await service.getById(args.id, args.controller);
    console.log(data);
    return data;
  },
  args: service.getArgsGetById,
};
