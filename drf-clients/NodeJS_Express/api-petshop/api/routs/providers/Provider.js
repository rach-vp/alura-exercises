const ProvidersTable = require('./ProvidersTable');
const InvalidField = require('../../error/InvalidField');
const NoUpdatableData = require('../../error/NoUpdatableData');

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
    this.validate();
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

  async getProvider() {
    const result = await ProvidersTable.getProviderById(this.id);

    this.provider = result.provider;
    this.email = result.email;
    this.category = result.category;
    this.dateCreation = result.dateCreation;
    this.dateUpdate = result.dateUpdate;
    this.version = result.version;
  }

  async update() {
    await ProvidersTable.getProviderById(this.id);
    const updatableFields = ['provider', 'email', 'category'];
    const updatableData = {};

    updatableFields.forEach(field => {
      const value = this[field];
      if (typeof value === 'string' && value !== '') {
        updatableData[field] = value;
      }
    });

    if (!Object.keys(updatableData).length) {
      throw new NoUpdatableData();
    }

    await ProvidersTable.update(this.id, updatableData);
  }

  async delete() {
    return ProvidersTable.delete(this.id);
  }

  async validate() {
    const fields = ['provider', 'email', 'category'];
    fields.forEach(field => {
      const value = this[field];
      if (typeof value !== 'string' || !value.length) {
        throw new InvalidField(field);
      }
    });
  }
}

module.exports = Provider;
