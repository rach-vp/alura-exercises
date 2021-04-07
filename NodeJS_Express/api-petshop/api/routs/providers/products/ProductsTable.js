const Model = require('./ProductTableModel');

module.exports = {
  list(idProvider) {
    return Model.findAll({
      where: {
        provider: idProvider,
      }
    });
  }
};
