import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import QueryType from '../graphqlTypes/queryType';
import MutationType from '../graphqlTypes/mutationType';

export  default new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})