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
  async resolve(_: undefined, args: any, context: Function) {
    const auth: { user: UserDB }  = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    const updated = await service.update(
      args.id,
      args.controller,
      args[args.controller]
    );
    return updated;
  },
  args: service.getArgsUpdate,
};
