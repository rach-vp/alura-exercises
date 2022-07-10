module.exports = {
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
