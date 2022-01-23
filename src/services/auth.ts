import bcrypt from 'bcryptjs';
import { GraphQLString } from 'graphql';
import { PostgresLib } from '../lib/postgresLib';
export default class AuthServices {
  private table: string;
  private postgresLib: PostgresLib;
  constructor() {
    this.table = 'users';
    this.postgresLib = new PostgresLib();
  }

  public get argsCreateUser() {
    return {
      username: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      displayName: {
        type: GraphQLString,
      },
    };
  }

  public async createUser(
    username: string,
    password: string,
    displayName: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.postgresLib.registerUser(
      username,
      hashedPassword,
      displayName
    );
    return createdUser;
  }
}
