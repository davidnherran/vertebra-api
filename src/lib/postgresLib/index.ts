import { createConnection, Connection } from 'typeorm';
import { Users } from './entities/users';
import { Characters } from './entities/characters';
import { Episodes } from './entities/episodes';
import { Locations } from './entities/locations';
import { envConfig } from '../../config/index';
import {
  USERNAME_IS_ALREADY_IN_USE,
  INCORRECT_USERNAME,
  CONTROLLER_IS_REQUIRED,
} from '../../utils/handlerErrors/codes';
import JWT from '../../utils/auth/jwt';
export class PostgresLib {
  public connection: Promise<Connection>;
  private users: Users;
  private entitiesCrud: Map<string, Locations | Episodes | Characters>;
  private location: Locations;
  private characters: Characters;
  private episodes: Episodes;
  private jwt: JWT;
  constructor() {
    this.connection = createConnection({
      type: 'postgres',
      host: envConfig.dbHost,
      port: parseInt(envConfig.dbPort!),
      username: envConfig.dbUsername,
      password: envConfig.dbPassword,
      database: envConfig.dbName,
      entities: [Users, Characters, Locations, Episodes],
    });
    this.users = new Users();
    this.location = new Locations();
    this.characters = new Characters();
    this.episodes = new Episodes();
    this.entitiesCrud = new Map<string, Locations | Episodes | Characters>()
      .set('locations', this.location)
      .set('characters', this.characters)
      .set('episodes', this.episodes);
    this.jwt = new JWT();
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
    if (user) throw new Error(USERNAME_IS_ALREADY_IN_USE);
    this.users.displayName = displayName;
    this.users.password = password;
    this.users.username = username;
    return await this.users.save();
  }

  public async updateUsername(
    newusername: string,
    oldusername: string,
  ) {
    const user = await this.users.findByUsername(oldusername);
    if (!user) throw new Error(INCORRECT_USERNAME);
    const data = await this.users.updateUsername(user?.id!, newusername);
    const newtoken = this.jwt.generateJWT({
      user: {
        id: user.id,
        displayName: user.displayName,
        username: newusername,
      },
    });
    return { newtoken, data };
  }

  public async updatePassword(id: number, newpassword: string) {
    const user = await this.users.findById(id);
    if (!user) throw new Error(`IDENTIFIER_${id}_NOT_EXIST`);
    return await this.users.updatePassword(id, newpassword);
  }

  public async deleteUser(id: number) {
    const user = await this.users.findById(id);
    if (!user) throw new Error(`IDENTIFIER_${id}_NOT_EXIST`);
    return await user.remove();
  }

  public async find(entitye: string, limit: number[]) {
    const entityResolve = this.entitiesCrud.get(entitye);
    if (!entityResolve) throw new Error(CONTROLLER_IS_REQUIRED);
    return await entityResolve?.findAll(limit);
  }

  public async create(
    entity: string,
    data: LocationsCreate & CharactersCreate & EpisodesCreate
  ) {
    const entityResolve = this.entitiesCrud.get(entity);
    if (!entityResolve) throw new Error(CONTROLLER_IS_REQUIRED);
    return await entityResolve.create(data);
  }

  public async findById(entity: string, id: number) {
    const entityResolve = this.entitiesCrud.get(entity);
    if (!entityResolve) throw new Error(CONTROLLER_IS_REQUIRED);
    const data = await entityResolve.findById(id);
    if (!data) throw new Error(`@crud/IDENTIFIER_${id}_NOT_EXIST_IN_${entity}`);
    return data;
  }

  public async delete(entity: string, id: number) {
    const entityResolve = this.entitiesCrud.get(entity);
    if (!entityResolve) throw new Error(CONTROLLER_IS_REQUIRED);
    const deletedData = await entityResolve.delete(id);
    if (deletedData.affected !== 1)
      throw new Error(`@crud/IDENTIFIER_${id}_NOT_EXIST`);
    return {
      affected: deletedData.affected,
      idDeleted: id,
      message: `Data removed from ${entity}`,
    };
  }

  public async update(
    entity: string,
    id: number,
    newdata: LocationsUpdate & CharactersUpdate & EpisodesUpdate
  ) {
    const exist = await this.findById(entity, id);
    if (!exist) throw new Error(`IDENTIFIER_${id}_NOT_EXIST_IN_${entity}`);
    const entityResolve = this.entitiesCrud.get(entity);
    if (!entityResolve) throw new Error(CONTROLLER_IS_REQUIRED);
    const updatedData = await entityResolve.update(id, newdata);
    return {
      affected: updatedData,
      message: `Data updated from ${entity}`,
      idUpdated: id,
    };
  }
}
