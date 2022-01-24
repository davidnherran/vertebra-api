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
                  name: 'objectOrigincharacter',
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

export const CreatedLocation = new GraphQLObjectType({
  name: 'CreatedLocation',
  fields: {
    value: {
      type: new GraphQLObjectType({
        name: 'createlocation',
        fields: {
          id: { type: GraphQLInt },
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
    message: { type: GraphQLString },
  },
});

export const CreatedCharacter = new GraphQLObjectType({
  name: 'CreatedCharacter',
  fields: {
    value: {
      type: new GraphQLObjectType({
        name: 'createcharacter',
        fields: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
          type: { type: GraphQLString },
          status: { type: GraphQLString },
          species: { type: GraphQLString },
          gender: { type: GraphQLString },
          origin: {
            type: new GraphQLObjectType({
              name: 'objectorigincharacter',
              fields: {
                name: { type: GraphQLString },
                url: { type: GraphQLString },
              },
            }),
          },
          location: {
            type: new GraphQLObjectType({
              name: 'objectlocationofcharacter',
              fields: {
                name: { type: GraphQLString },
                url: { type: GraphQLString },
              },
            }),
          },
          image: { type: GraphQLString },
          episode: { type: GraphQLString },
          url: { type: GraphQLString },
          created: { type: GraphQLString },
        },
      }),
    },
    message: { type: GraphQLString },
  },
});

export const CreatedEpisode = new GraphQLObjectType({
  name: 'CreatedEpisode',
  fields: {
    value: {
      type: new GraphQLObjectType({
        name: 'createepisode',
        fields: {
          id: { type: GraphQLInt },
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
    message: { type: GraphQLString },
  },
});
