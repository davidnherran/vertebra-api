import { createConnection, Connection } from 'typeorm';
import { Users } from './entities/users';
import { UsersRepository } from './repositories/users-repository';
import { envConfig } from '../../config/index';
import { USERNAME_IS_ALREADY_IN_USE } from '../../utils/handlerErrors/codes';
export class PostgresLib {
  public connection: Promise<Connection>;
  //private usersRepository: Promise<UsersRepository>;
  private users: Users;
  constructor() {
    this.connection = createConnection({
      type: 'postgres',
      host: envConfig.dbHost,
      port: parseInt(envConfig.dbPort!),
      username: envConfig.dbUsername,
      password: envConfig.dbPassword,
      database: envConfig.dbName,
      entities: [Users],
    });
    /* this.usersRepository = this.connection.then((connect) =>
      connect.getCustomRepository(UsersRepository)
    ); */
    this.users = new Users();
  }

  public async existUser(username: string, connectExtend?: Connection) {
    const connect = await this.connection
    const user = await connect
      .getCustomRepository(UsersRepository)
      .findByUsername(username);
    connect.close()
    return user;
  }

  public async registerUser(
    username: string,
    password: string,
    displayName: string
  ) {
    const connect = await this.connection;
    const existingUsername = await connect
      .getCustomRepository(UsersRepository)
      .findByUsername(username);
    if (Boolean(existingUsername)) return USERNAME_IS_ALREADY_IN_USE;
    this.users.displayName = displayName;
    this.users.password = password;
    this.users.username = username;
    const user = await connect
      .getCustomRepository(UsersRepository)
      .save(this.users);
    delete user.password;
    connect.close();
    return user;
  }

  public async updateUsername(newUsername: string, oldUsername: string) {
    const connect = await this.connection;
    const user = await connect
    .getCustomRepository(UsersRepository)
    .findByUsername(oldUsername);
    return connect
      .getCustomRepository(UsersRepository)
      .updateUsername(user?.id!, newUsername)
      .then((result) => result)
      .finally(() => connect.close());
    //return updatedUsername;
  }

  public async updatePassword(newPassword: string, id: number) {
    const connect = await this.connection;
    const user = await connect
      .getCustomRepository(UsersRepository)
      .findById(id);
    const updatedPassword = await connect
      .getCustomRepository(UsersRepository)
      .updatePassword(user?.id!, newPassword);
    connect.close();
    return updatedPassword;
  }

  public async deleteUser(id: number) {
    const connect = await this.connection;
    const user = await connect
      .getCustomRepository(UsersRepository)
      .findById(id);
    const deletedUser = await connect
      .getCustomRepository(UsersRepository)
      .remove(user!);
    connect.close();
    return deletedUser;
  }
}
