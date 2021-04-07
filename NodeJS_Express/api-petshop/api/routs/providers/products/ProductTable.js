const Model = require('./ProductTableModel');
const instance = require('../../../database');
const NotFound =require('../../../error/NotFound');

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
    if (!productFound) throw new NotFound('Product');
    return productFound;
  },
  async update(productData, dataToUpdate) {
    return await Model.update(
      dataToUpdate,
      { where: productData },
    );
  },
  decreaseStock(productId, providerId, currAmmount) {
    return instance.transaction(async operation => {
      const product = await Model.findOne({
        where: { id: productId, provider: providerId },
      });
      product['stock'] = currAmmount;
      await product.save();
      return product;
    })
  }
};
