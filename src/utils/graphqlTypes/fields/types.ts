import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export const LocationsResponse = new GraphQLInputObjectType({
  name: 'LocationsResponse',
  description: '',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    dimension: { type: new GraphQLNonNull(GraphQLString) },
    residents: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    created: { type: new GraphQLNonNull(GraphQLString) },
  },
});
