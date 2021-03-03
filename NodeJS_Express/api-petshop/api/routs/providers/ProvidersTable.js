const Model = require('./ProvidersTableModel');

module.exports ={
  list() {
    return Model.findAll();
  },
  insert(provider) {
    return Modelo.create(provider);
  },
  async getProviderById(id) {
    const match = await Model.findOne({
      where: { id }
    });
    if (!match) throw new Error('Provider not found');
    return match;
  },
  async update(id, updatableData) {
    return Model.update(updatableData, {
      where: { id },
    })
  }
}