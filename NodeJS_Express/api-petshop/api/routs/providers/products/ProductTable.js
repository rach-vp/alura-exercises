const Model = require('./ProductTableModel');

module.exports = {
  list(providerId) {
    return Model.findAll({
      where: {
        provider: providerId,
      }
    });
  },
  create(productData) {
    return Model.create(productData);
  },
};
