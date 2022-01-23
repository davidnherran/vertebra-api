import { GraphQLString } from 'graphql';
import AuthServices from '../../../services/auth';
import JWT from '../../auth/jwt';
import { USERNAME_IS_ALREADY_IN_USE } from '../../handlerErrors/codes';

const authService = new AuthServices();
const jwt = new JWT();

export default {
  type: GraphQLString,
  description: 'Register a new user and returns a token',
  async resolve(_: any, args: CreateUser) {
    const { username, password, displayName } = args;
    const createdUser = await authService.createUser(
      username,
      password,
      displayName
    );

    if (createdUser === USERNAME_IS_ALREADY_IN_USE)
      throw new Error(USERNAME_IS_ALREADY_IN_USE);
    return jwt.generateJWT({ user: createdUser });
  },
  args: authService.argsCreateUser,
};
