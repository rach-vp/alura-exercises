const Model = require('./ProductTableModel');

module.exports = {
  list(providerId) {
    return Model.findAll({
      where: {
        provider: providerId,
      },
      raw: true,
    });
  },
  create(productData) {
    return Model.create(productData);
  },
  delete(productId, providerId) {
    return Model.destroy({
      where: {
        id: productId,
        provider: providerId,
      },
    })
  },
  async getProductById(productId, providerId) {
    const productFound = await Model.findOne({
      where: {
        id: productId,
        provider: providerId,
      },
      raw: true,
    });
    if (!productFound) throw new Error('Product not found');
    return productFound;
  }
};
