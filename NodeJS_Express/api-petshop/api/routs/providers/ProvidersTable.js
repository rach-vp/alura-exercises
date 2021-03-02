const Model = require('./ProvidersTableModel');

module.exports ={
  list() {
    return Model.findAll();
  }
}