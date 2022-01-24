import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import Service from '../../../services/service';

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
  async resolve(_: any, args: any, context: any) {
    const auth = context();
    if (!auth.user) throw new Error('UNAHUTORIZED');
    const deletedData = await service.delete(args.id, args.controller);
    return deletedData;
  },
  args: service.GetArgsDelete,
};
