import { GraphQLString } from 'graphql';
import AuthService from '../../../services/auth';
import { UNAUTHORIZED } from '../../handlerErrors/codes';

const authService = new AuthService();

export default {
  type: GraphQLString,
  description: 'delete user',
  async resolve(_: undefined, _a: undefined, context: Function) {
    const auth: { user: UserDB } = context();
    if (!auth.user) throw new Error(UNAUTHORIZED);
    await authService.deleteUser(auth.user);
    return `user with identifier ${auth.user.id} and username ${auth.user.username} removed`;
  },
};
