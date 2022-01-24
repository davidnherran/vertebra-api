import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import Service from '../../../services/service';
import { UNAUTHORIZED } from '../../handlerErrors/codes';

const service = new Service();

export default {
  type: new GraphQLObjectType({
    name: 'DeletedCharacterOrEpisodeOrLocation',
    fields: {
      idDeleted: { type: GraphQLInt },
      affected: { type: GraphQLInt },
      message: { type: GraphQLString },
    },
  }),
  description: 'Filtered location list',
  async resolve(_: undefined, args: ArgsCrud, context: Function) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    const deletedData = await service.delete(args.id, args.controller);
    return deletedData;
  },
  args: service.GetArgsDelete,
};
