import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import AuthService from '../../../services/auth';
import { UNAUTHORIZED } from '../../handlerErrors/codes';

const authService = new AuthService();

export default {
  type: new GraphQLObjectType({
    name: 'UpdatePassword',
    fields: {
      message: { type: GraphQLString },
      affected: { type: GraphQLInt },
    },
  }),
  description: 'update password',
  async resolve(
    _: undefined,
    args: { newPassword: string },
    context: Function
  ) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    const newPassword = await authService.updatePassword(
      auth.user.id,
      args.newPassword
    );
    return {
      message: `updated password of the user with identifier ${auth.user.id} and username ${auth.user.username}`,
      affected: newPassword.affected,
    };
  },
  args: {
    newPassword: { type: GraphQLString },
  },
};
