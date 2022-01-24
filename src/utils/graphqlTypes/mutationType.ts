import { GraphQLObjectType, GraphQLString } from 'graphql';
import {
  register,
  login,
  create,
  deleteCrud,
  update,
  updateUsername,
  updatePassword,
} from './fields';
import AuthService from '../../services/auth';

const authService = new AuthService();
export default new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: {
    register,
    login,
    create,
    delete: deleteCrud,
    update,
    updateUsername,
    updatePassword,
    deleteUser: {
      type: GraphQLString,
      description: 'delete user',
      async resolve(_, _a, context: Function) {
        const auth = context();
        if (!auth.user) throw new Error('UNHAUTORIZED');
        await authService.deleteUser(auth.user);
        return `user with identifier ${auth.user.id} and username ${auth.user.username} removed`;
      },
    },
  },
});
