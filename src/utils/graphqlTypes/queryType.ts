import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        hello: {
            type: GraphQLString,
            description: "return a string",
            resolve: () => 'hello world'
        }
    }
})