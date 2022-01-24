import bcrypt from 'bcryptjs';
import { GraphQLString } from 'graphql';
import { PostgresLib } from '../lib/postgresLib';
import {
  INCORRECT_USERNAME,
  INCORRECT_PASSWORD,
  USERNAME_IS_ALREADY_IN_USE,
} from '../utils/handlerErrors/codes';
export default class AuthServices {
  private postgresLib: PostgresLib;
  constructor() {
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

  public get argsLoginUser() {
    return {
      username: {
        type: GraphQLString,
      },
      password: {
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

  public async loginUser(username: string, password: string) {
    const user = await this.postgresLib.existUser(username);
    if (!user) {
      return INCORRECT_USERNAME;
    }
    if (!(await bcrypt.compare(password, user.password!))) {
      return INCORRECT_PASSWORD;
    }
    delete user.password;

    return user;
  }

  public async getUser(username: string) {
    const user = await this.postgresLib.existUser(username);
    return user;
  }

  public async updateUsername(
    newUSername: string,
    oldUsername: string,
    userdb: UserDB
  ) {
    const user = await this.getUser(newUSername);
    if (user) throw new Error(USERNAME_IS_ALREADY_IN_USE);
    const updatedUSername = await this.postgresLib.updateUsername(
      newUSername,
      oldUsername,
      userdb
    );
    return updatedUSername;
  }
}
