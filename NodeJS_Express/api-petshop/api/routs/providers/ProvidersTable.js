const Model = require('./ProvidersTableModel');

module.exports ={
  list() {
    return Model.findAll();
  },
  insert(provider) {
    return Modelo.create(provider);
  }
}