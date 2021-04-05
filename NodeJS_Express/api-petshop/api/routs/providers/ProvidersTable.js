const Model = require('./ProvidersTableModel');
const NotFound = require('../../error/NotFound');

module.exports ={
  list() {
    return Model.findAll({ raw: true });
  },
  insert(provider) {
    return Modelo.create(provider);
  },
  async getProviderById(id) {
    const match = await Model.findOne({
      where: { id }
    });
    if (!match) throw new NotFound();
    return match;
  },
  async update(id, updatableData) {
    return Model.update(updatableData, {
      where: { id },
    })
  },
  async delete(id) {
    return Model.destroy({
      where: { id },
    });
  }
}