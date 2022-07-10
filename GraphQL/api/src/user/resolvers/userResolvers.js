const { GraphQLScalarType } = require('graphql');

module.exports = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'String of datetime ISO-8601',
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Query: {
    users: (_root, _args, { dataSources }) => dataSources.usersAPI.getUsers(),
    userById: (_root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id),
  },
  Mutation: {
    addUser: (_root, user, { dataSources }) => dataSources.usersAPI.addUser(user),
    updateUser: (_root, data, { dataSources }) => dataSources.usersAPI.updateUser(data),
    removeUser: (_root, { id }, { dataSources }) => dataSources.usersAPI.removeUser(id),
  },
};
