module.exports = {
  Query: {
    users: (_root, _args, { dataSources }) => dataSources.usersAPI.getUsers(),
    userById: (_root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id),
  },
};
