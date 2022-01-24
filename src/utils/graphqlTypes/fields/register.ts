import { GraphQLString } from 'graphql';
import AuthServices from '../../../services/auth';
import JWT from '../../auth/jwt';

const authService = new AuthServices();
const jwt = new JWT();

export default {
  type: GraphQLString,
  description: 'Register a new user and returns a token',
  async resolve(_: undefined, args: CreateUser) {
    const { username, password, displayName } = args;
    const createdUser = await authService.createUser(
      username,
      password,
      displayName
    );
    return jwt.generateJWT({ user: createdUser });
  },
  args: authService.argsCreateUser,
};
