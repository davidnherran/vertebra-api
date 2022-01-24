import { GraphQLUnionType } from 'graphql';
import {
  GetByIdCharacter,
  GetByIdEpisode,
  GetByIdLocationType,
} from './myCustomTypes';
import Service from '../../../services/service';
import { UNAUTHORIZED } from '../../handlerErrors/codes';
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
  async resolve(_: undefined, args: ArgsCrud, context: Function) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    const data = await service.getById(args.id, args.controller);
    return data;
  },
  args: service.getArgsGetById,
};
