import { createConnection, Connection } from 'typeorm';
import { Users } from './entities/users';
import { UsersRepository } from './repositories/users-repository';
import { envConfig } from '../../config/index';
import { USERNAME_IS_ALREADY_IN_USE } from '../../utils/handlerErrors/codes';
export class PostgresLib {
  private connection: Promise<Connection>;
  private usersRepository: Promise<UsersRepository>;
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
    this.usersRepository = this.connection.then((connect) =>
      connect.getCustomRepository(UsersRepository)
    );
    this.users = new Users();
  }

  public async existUser(username: string) {
    const existingUsername = (await this.usersRepository).findByUsername(
      username
    );
    return existingUsername;
  }

  public async registerUser(
    username: string,
    password: string,
    displayName: string
  ) {
    const existingUsername = await this.existUser(username);
    if (Boolean(existingUsername)) return USERNAME_IS_ALREADY_IN_USE;
    this.users.displayName = displayName;
    this.users.password = password;
    this.users.username = username;
    const user = await (await this.usersRepository).save(this.users);
    delete user.password
    return user
  }

  public async updateUsername(newUsername: string, oldUsername: string) {
    const user = await this.existUser(oldUsername);
    return (await this.usersRepository).updateUsername(user?.id!, newUsername);
  }

  public async updatePassword(newPassword: string, id: number) {
    const user = await (await this.usersRepository).findById(id);
    return (await this.usersRepository).updatePassword(user?.id!, newPassword);
  }

  public async deleteUser(id: number) {
    const user = await (await this.usersRepository).findById(id);
    return await (await this.usersRepository).remove(user!);
  }
}
