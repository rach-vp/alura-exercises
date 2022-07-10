const { ApolloServer } = require('apollo-server');
const userSchema = require('./user/schema/user.graphql');
const userResolvers = require('./user/resolvers/userResolvers');
const UsersAPI = require('./user/datasource/user');

const typeDefs = [userSchema];
const resolvers = [userResolvers];
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersAPI: new UsersAPI(),
  }),
});

server.listen({ port: PORT }).then(() => console.log(`Server running on port ${PORT}`));
