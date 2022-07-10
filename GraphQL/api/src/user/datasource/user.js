const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
  }

  async getUsers() {
    const users = await this.get('/users');
    return users.map(async user => (
      { ...user, role: await this.get(`/roles/${user.role}`) }
    ));
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`);
    return { ...user, role: await this.get(`/roles/${user.role}`) }
  }
}

module.exports = UsersAPI;
