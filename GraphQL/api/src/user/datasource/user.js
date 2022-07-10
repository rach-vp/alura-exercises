const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
    this.customResponse = {
      code: 200,
      message: 'success',
    }
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

  async addUser(data) {
    const { role: roleStr, ...userData } = data;
    const [role] = await this.get(`/roles?type=${roleStr}`);
    return this.post(
      '/users',
      { id: await this.autoincrementId(), role: role.id, ...userData },
    );
  }

  async updateUser(data) {
    const { role: roleStr, ...userData } = data;
    const [role] = await this.get(`/roles?type=${roleStr}`);
    await this.patch(
      `/users/${userData.id}`,
      { role: role.id, ...userData },
    );
    return {
      ...this.customResponse,
      user: { ...data, role },
    }
  }

  async removeUser(id) {
    await this.delete(`/users/${id}`);
    this.customResponse.code = 204;
    return this.customResponse;
  }

  async autoincrementId() {
    const users = await this.get('/users');
    const { id } = users.at(-1);
    return id + 1;
  }
}

module.exports = UsersAPI;
