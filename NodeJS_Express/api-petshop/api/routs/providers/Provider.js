const ProvidersTable = require('./ProvidersTable');

class Provider {
  constructor({ id, provider, email, category, dateCreation, dateUpdate, version }) {
    this.id = id;
    this.provider = provider;
    this.email = email;
    this.category = category;
    this.dateCreation = dateCreation;
    this.dateUpdate = dateUpdate;
    this.version = version;
  }

  async create() {
    const result = await ProvidersTable.insert({
      provider: this.provider,
      email: this.email,
      category: this.category,
    });

    this.id = result.id;
    this.dateCreation = result.dateCreation;
    this.dateUpdate = result.dateUpdate;
    this.version = result.version;
  }
}

module.exports = Provider;