import { GraphQLObjectType } from 'graphql';
import {
  register,
  login,
  create,
  deleteCrud,
  update,
  updateUsername,
  updatePassword,
  deleteUser,
} from './fields';
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
    deleteUser,
  },
});
