import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { register, login, create, deleteCrud, update } from './fields';
import AutService from '../../services/auth';
import JWT from '../auth/jwt';

const autService = new AutService();
const jwt = new JWT();

export default new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: {
    register,
    login,
    create,
    delete: deleteCrud,
    update,
    updateUsername: {
      type: new GraphQLObjectType({
        name: 'UpdateUsername',
        fields: {
          message: { type: GraphQLString },
          newUsername: { type: GraphQLString },
          token: { type: GraphQLString },
          affected: { type: GraphQLInt },
        },
      }),
      description: 'update username',
      args: {
        oldUsername: { type: GraphQLString },
        newUsername: { type: GraphQLString },
      },
      async resolve(_: any, args, context: Function) {
        const auth = context();
        if (!auth.user || auth.user.username !== args.oldUsername)
          throw new Error('UNHAUTORIZED');
        const newusername = await autService.updateUsername(
          args.newUsername,
          args.oldUsername,
          auth.user
        );
        return {
          message: 'updated username',
          newUsername: `your new username is now ${args.newUsername}`,
          affected: newusername.data.affected,
          token: newusername.newtoken,
        };
      },
    },
  },
});
