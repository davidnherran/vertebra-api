import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import Service from '../../../services/service';

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
  async resolve(_: any, args: any) {
    console.log(args[args.controller]);
    const updated = await service.update(
      args.id,
      args.controller,
      args[args.controller]
    );
    console.log(updated);
    return updated;
  },
  args: service.getArgsUpdate,
};
