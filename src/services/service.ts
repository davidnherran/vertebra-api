import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { PostgresLib } from '../lib/postgresLib';
import { Locations } from '../lib/postgresLib/entities/locations';
import { CONTROLLER_IS_REQUIRED } from '../utils/handlerErrors/codes';

class LocationsArr {
  value: Array<Locations>;
  message: string;
  constructor() {
    (this.value = []), (this.message = '');
  }
}

export default class AuthServices {
  private postgresLib: PostgresLib;
  constructor() {
    this.postgresLib = new PostgresLib();
  }

  public get getArgs() {
    return {
      limit: {
        type: new GraphQLList(GraphQLInt),
      },
      controller: {
        type: GraphQLString,
      },
    };
  }

  public async getAll(limit: Array<number>, controller: string) {
    console.log(controller);
    const filterData = await this.postgresLib.get(controller, limit);
    return { value: filterData, message: `${controller} data` };
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
