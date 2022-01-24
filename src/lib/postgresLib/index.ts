import { createConnection, Connection, EntitySchema } from 'typeorm';
import { Users } from './entities/users';
import { Characters } from './entities/characters';
import { Episodes } from './entities/episodes';
import { Locations } from './entities/locations';
//import { UsersRepository } from './repositories/users-repository';
//import { LocationsRepository } from './repositories/locations-repository';
//import { CharactersRepository } from './repositories/characters-repository';
//import { EpisodesRepository } from './repositories/episodes-repository';
import { envConfig } from '../../config/index';
import {
  USERNAME_IS_ALREADY_IN_USE,
  INCORRECT_USERNAME,
  CONTROLLER_IS_REQUIRED,
} from '../../utils/handlerErrors/codes';
class LocationsArr {
  value: Array<Locations>;
  message: string;
  constructor() {
    (this.value = []), (this.message = '');
  }
}

export class PostgresLib {
  public connection: Promise<Connection>;
  private users: Users;
  private entitiesCrud: Map<string, Locations | Episodes | Characters>;
  private location: Locations;
  private characters: Characters;
  private episodes: Episodes;
  constructor() {
    this.connection = createConnection({
      type: 'postgres',
      host: envConfig.dbHost,
      port: parseInt(envConfig.dbPort!),
      username: envConfig.dbUsername,
      password: envConfig.dbPassword,
      database: envConfig.dbName,
      entities: [Users, Characters, Locations, Episodes],
      synchronize: true,
    });
    this.users = new Users();
    this.location = new Locations();
    this.characters = new Characters();
    this.episodes = new Episodes();
    this.entitiesCrud = new Map<string, Locations | Episodes | Characters>()
      .set('locations', this.location)
      .set('characters', this.characters)
      .set('episodes', this.episodes);
  }

  public async existUser(username: string) {
    return await this.users.findByUsername(username);
  }

  public async registerUser(
    username: string,
    password: string,
    displayName: string
  ) {
    const user = await this.users.findByUsername(username);
    if (user) return USERNAME_IS_ALREADY_IN_USE;
    this.users.displayName = displayName;
    this.users.password = password;
    this.users.username = username;
    return await this.users.save();
  }

  public async updateUsername(newusername: string, oldusername: string) {
    const user = await this.users.findByUsername(oldusername);
    if (!user) return INCORRECT_USERNAME;
    return await this.users.updateUsername(user?.id!, newusername);
  }

  public async updatePassword(id: number, newpassword: string) {
    const user = await this.users.findById(id);
    if (!user) return 'ID NOT EXIST';
    return await this.users.updatePassword(id, newpassword);
  }

  public async deleteUser(id: number) {
    const user = await this.users.findById(id);
    if (!user) return 'ID IS NOT EXIST';
    return await user.remove();
  }

  public async get(entitye: string, limit: number[]) {
    const entityeResolve = this.entitiesCrud.get(entitye);
    if (!entityeResolve) throw new Error(CONTROLLER_IS_REQUIRED);
    return await entityeResolve?.findAll(limit);
  }

  /*
  public async get(repository: string, limit: Array<number>) {
    console.log('ok');
    const connect = await this.connection;
    const data = await connect
      .getCustomRepository(LocationsRepository)
      .findAll(limit);
    connect.close();
    return data;
  }
  public async getById(repository: string, id: number) {
    const connect = await this.connection;
    const data = await connect
      .getCustomRepository(
        repository === 'LocationsRepository'
          ? LocationsRepository
          : repository === 'CharactersRepository'
          ? CharactersRepository
          : EpisodesRepository
      )
      .findById(id);
    connect.close();
    return data;
  }

  public async update(repository: string, id: number, newdata: object) {
    const connect = await this.connection;
    const data = await connect
      .getCustomRepository(
        repository === 'LocationsRepository'
          ? LocationsRepository
          : repository === 'CharactersRepository'
          ? CharactersRepository
          : EpisodesRepository
      )
      .update(id, newdata);
    connect.close();
    return data;
  }

  public async delete(repository: string, id: number) {
    const connect = await this.connection;
    const data = await connect
      .getCustomRepository(
        repository === 'LocationsRepository'
          ? LocationsRepository
          : repository === 'CharactersRepository'
          ? CharactersRepository
          : EpisodesRepository
      )
      .delete(id);
    connect.close();
    return data;
  } */
}
