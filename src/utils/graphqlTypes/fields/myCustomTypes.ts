import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const LocationTypes = new GraphQLObjectType({
  name: 'LocationTypes',
  description: 'location data',
  fields: {
    value: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'objectLocation',
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
    },
    message: { type: GraphQLString },
  },
});

export const CharactersTypes = new GraphQLObjectType({
  name: 'CharactersTypes',
  description: 'charaters data',
  fields: {
    value: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'objectCharacters',
          fields: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            specie: { type: new GraphQLNonNull(GraphQLString) },
            type: { type: new GraphQLNonNull(GraphQLString) },
            gender: { type: new GraphQLNonNull(GraphQLString) },
            origin: {
              type: new GraphQLNonNull(
                new GraphQLObjectType({
                  name: 'objectOrigin',
                  fields: {
                    name: { type: GraphQLString },
                    url: { type: GraphQLString },
                  },
                })
              ),
            },
            location: {
              type: new GraphQLNonNull(
                new GraphQLObjectType({
                  name: 'objectLocationOfCharacter',
                  fields: {
                    name: { type: GraphQLString },
                    url: { type: GraphQLString },
                  },
                })
              ),
            },
            image: { type: new GraphQLNonNull(GraphQLString) },
            episode: {
              type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            },
            url: { type: new GraphQLNonNull(GraphQLString) },
            created: { type: new GraphQLNonNull(GraphQLString) },
          },
        })
      ),
    },
    message: { type: GraphQLString },
  },
});

export const EpisodesTypes = new GraphQLObjectType({
  name: 'EpisodesTypes',
  description: 'episodes data',
  fields: {
    value: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'objectEpisodes',
          fields: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            air_date: { type: new GraphQLNonNull(GraphQLString) },
            episode: { type: new GraphQLNonNull(GraphQLString) },
            characters: {
              type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            },
            url: { type: new GraphQLNonNull(GraphQLString) },
            created: { type: new GraphQLNonNull(GraphQLString) },
          },
        })
      ),
    },
    message: { type: GraphQLString },
  },
});
