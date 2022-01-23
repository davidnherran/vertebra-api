import { GraphQLObjectType, GraphQLString } from 'graphql';
import AuthServices from '../../services/auth';
import JWT from '../auth/jwt';
import { USERNAME_IS_ALREADY_IN_USE } from '../handlerErrors/codes';

const authService = new AuthServices();
const jwt = new JWT();

export default new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: {
    register: {
      type: GraphQLString,
      description: 'Register new user',
      async resolve(_, args) {
        const { username, password, displayName } = args;
        const createdUser = await authService.createUser(
          username,
          password,
          displayName
        );

        if (createdUser === USERNAME_IS_ALREADY_IN_USE)
          return USERNAME_IS_ALREADY_IN_USE;
        return jwt.generateJWT({ user: createdUser });
      },
      args: authService.argsCreateUser,
    },
  },
});
