import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { PostgresLib } from '../lib/postgresLib';
export default class AuthServices {
  private postgresLib: PostgresLib;
  constructor() {
    this.postgresLib = new PostgresLib();
  }

  public get getArgsGetById() {
    return {
      id: { type: GraphQLInt },
      controller: {
        type: GraphQLString,
      },
    };
  }

  public get getArgsGetAll() {
    return {
      limit: {
        type: new GraphQLList(GraphQLInt),
      },
      controller: {
        type: GraphQLString,
      },
    };
  }

  public get getArgsCreate() {
    return {
      controller: { type: GraphQLString },
      locations: {
        type: new GraphQLInputObjectType({
          name: 'CreateLocation',
          fields: {
            name: { type: GraphQLString },
            type: { type: GraphQLString },
            dimension: { type: GraphQLString },
            residents: {
              type: new GraphQLList(GraphQLString),
            },
            url: { type: GraphQLString },
            created: { type: GraphQLString },
          },
        }),
      },
      episodes: {
        type: new GraphQLInputObjectType({
          name: 'CreateEpisodes',
          fields: {
            name: { type: GraphQLString },
            air_date: { type: GraphQLString },
            episode: { type: GraphQLString },
            characters: {
              type: new GraphQLList(GraphQLString),
            },
            url: { type: GraphQLString },
            created: { type: GraphQLString },
          },
        }),
      },
      characters: {
        type: new GraphQLInputObjectType({
          name: 'CreateCharacter',
          fields: {
            name: { type: GraphQLString },
            type: { type: GraphQLString },
            status: { type: GraphQLString },
            species: { type: GraphQLString },
            gender: { type: GraphQLString },
            origin: {
              type: new GraphQLInputObjectType({
                name: 'objectorigin',
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
            location: {
              type: new GraphQLInputObjectType({
                name: 'objectlocationfieldscharacter',
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
            image: { type: GraphQLString },
            episode: { type: new GraphQLList(GraphQLString) },
            url: { type: GraphQLString },
            created: { type: GraphQLString },
          },
        }),
      },
    };
  }

  public async getAll(limit: Array<number>, controller: string) {
    const data = await this.postgresLib.get(controller, limit);
    return { value: data, message: `${controller} data` };
  }

  public async create(
    data: LocationsCreate & CharactersCreate & EpisodesCreate,
    controller: string
  ) {
    const createdData = await this.postgresLib.create(controller, data);
    return { value: createdData, message: `${controller} created` };
  }

  public async getById(id: number, controller: string) {
    const data = await this.postgresLib.findById(controller, id);
    if(!data) throw new Error(`ÌDENTIFIER_${id}_NOT_EXIST`)
    return { value: data, message: `${controller} data` };
  }

  /*
  public async getByid(id: number, controller: string) {
    const exectIn = this.hastable.get(controller);
    if (!exectIn) return CONTROLLER_IS_REQUIRED;
    //const data = await this.postgresLib.getById(exectIn, id);
    return 'data';
  }

  public async update(id: number, newdata: object, controller: string) {
    const exectIn = this.hastable.get(controller);
    if (!exectIn) return CONTROLLER_IS_REQUIRED;
    //const updatedData = await this.postgresLib.update(controller, id, newdata);
    return 'updatedData';
  }

  public async delete(id: number, controller: string) {
    const exectIn = this.hastable.get(controller);
    if (!exectIn) return CONTROLLER_IS_REQUIRED;
    //const deletedData = await this.postgresLib.delete(controller, id);
    return 'deletedData';
  } */
}
