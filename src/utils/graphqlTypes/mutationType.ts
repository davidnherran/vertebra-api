import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
  typeFromAST,
} from 'graphql';
import { register, login } from './fields';
import Service from '../../services/service';
import { LocationsResponse } from './fields/types';
const service = new Service();

class Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  resident: Array<string>;
  url: string;
  created: string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.type = '';
    this.dimension = '';
    this.resident = [''];
    this.url = '';
    this.created = '';
  }
}

class LocationResponse {
  arr: Array<Location>;
  constructor() {
    this.arr = Array<Location>();
  }
}

const parseValue = (value: any) => {
  if (value instanceof LocationResponse) {
    return +value;
  }
};

export default new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: {
    register,
    login,
    /* get: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'GetTypes',
          description: 'get types',
          fields: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            dimension: { type: new GraphQLNonNull(GraphQLString) },
            residents: {
              type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            },
            url: { type: new GraphQLNonNull(GraphQLString) },
            created: { type: new GraphQLNonNull(GraphQLString) },
          },
        })
      ),
      description: 'Filtered location list',
      async resolve(_: any, args: Get) {
        const filteredData = await service.getAll(args.limit, args.controller);
        return filteredData;
      },
      args: service.getArgs,
    } */
  },
});
