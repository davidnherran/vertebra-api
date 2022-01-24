import { GraphQLUnionType } from 'graphql';
import Service from '../../../services/service';
import { UNAUTHORIZED } from '../../handlerErrors/codes';

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
  async resolve(
    _: undefined,
    args: Map<
      string,
      string | (LocationsCreate & CharactersCreate & EpisodesCreate)
    >,
    context: Function
  ) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    const created = await service.create(
      args.get(args.get('controller') as string) as LocationsCreate &
        CharactersCreate &
        EpisodesCreate,
      args.get('controller') as string
    );
    return created;
  },
  args: service.getArgsCreate,
};
