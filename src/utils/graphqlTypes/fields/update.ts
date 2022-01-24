import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import Service from '../../../services/service';
import { UNAUTHORIZED } from '../../handlerErrors/codes';

const service = new Service();

export default {
  type: new GraphQLObjectType({
    name: 'UpdatedCharacterOrEpisodeOrLocation',
    fields: {
      idUpdated: { type: GraphQLInt },
      affected: { type: GraphQLInt },
      message: { type: GraphQLString },
    },
  }),
  async resolve(
    _: undefined,
    args: Map<
      string,
      string | (CharactersUpdate & EpisodesUpdate & LocationsUpdate) | number
    >,
    context: Function
  ) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    const updated = await service.update(
      args.get('id') as number,
      args.get('controller') as string,
      args.get(args.get('controller') as string) as CharactersUpdate &
        EpisodesUpdate &
        LocationsUpdate
    );
    return updated;
  },
  args: service.getArgsUpdate,
};
