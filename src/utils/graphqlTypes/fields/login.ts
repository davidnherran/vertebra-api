import { GraphQLString } from 'graphql';
import AuthServices from '../../../services/auth';
import JWT from '../../auth/jwt';

const authServices = new AuthServices();
const jwt = new JWT();

export default {
  type: GraphQLString,
  description: 'Login of the user and returns the token',
  async resolve(_: any, args: SignIn) {
    const user = await authServices.loginUser(args.username, args.password);
    if (typeof user === 'string') return user;
    return jwt.generateJWT({ user });
  },
  args: authServices.argsLoginUser,
};
