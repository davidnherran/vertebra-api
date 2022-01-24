import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import AutService from '../../../services/auth';
import { UNAUTHORIZED } from '../../handlerErrors/codes';

const autService = new AutService();
export default {
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
    newUsername: { type: GraphQLString },
  },
  async resolve(
    _: undefined,
    args: { newUsername: string },
    context: Function
  ) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    const newusername = await autService.updateUsername(
      args.newUsername,
      auth.user.username
    );
    return {
      message: 'updated username',
      newUsername: `your username changed from ${auth.user.username} from ${args.newUsername}`,
      affected: newusername.data.affected,
      token: newusername.newtoken,
    };
  },
};
