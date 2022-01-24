import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import {
  register,
  login,
  create,
  deleteCrud,
  update,
  updateUsername,
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
    updatePassword: {
      type: new GraphQLObjectType({
        name: 'UpdatePassword',
        fields: {
          message: { type: GraphQLString },
          affected: { type: GraphQLInt },
        },
      }),
      description: 'update password',
      async resolve(_: any, args: any, context: any) {
        const auth = context();
        if (!auth.user) throw new Error('UNHAUTORIZED');
        const newPassword = await authService.updatePassword(
          auth.user.id,
          args.newPassword
        );
        console.log(newPassword);
        return {
          message: `updated password of the user with identifier ${auth.user.id} and username ${auth.user.username}`,
          affected: newPassword.affected,
        };
      },
      args: {
        newPassword: { type: GraphQLString },
      },
    },
  },
});
