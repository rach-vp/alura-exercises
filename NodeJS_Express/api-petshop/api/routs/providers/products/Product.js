const ProductTable = require('./ProductTable');

class Product {
  constructor({ id, title, price, stock, provider,
    dateCreation, dateUpdate, version }) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.stock = stock;
      this.provider = provider;
      this.dateCreation = dateCreation;
      this.dateUpdate = dateUpdate;
      this.version = version;
  }

  validate() {
    if (typeof this.title !== 'string' || !this.title.length) {
      throw new Error('Field title is invalid');
    }
    if (typeof this.price !== 'number' || !this.price) {
      throw new Error('Field price is invalid');
    }
  }

  async create() {
    this.validate();

    const result = await ProductTable.create({
      title: this.title,
      price: this.price,
      stock: this.stock,
      provider: this.provider,
    });

    this.id = result.id;
    this.dateCreation = result.dateCreation;
    this.dateUpdate = result.dateUpdate;
    this.version = result.version;
  }

  async delete() {
    return await ProductTable.delete(this.id, this.provider);
  }

  async getProduct() {
    const product = await ProductTable.getProductById(this.id, this.provider);

    this.title = product.title;
    this.price = product.price;
    this.stock = product.stock;
    this.dateCreation = product.dateCreation;
    this.dateUpdate = product.dateUpdate;
    this.version = product.version;
  }

  async update() {
    const updatableData = {};

    updatableData.title = typeof this.title === 'string' && this.title.length ? this.title : null;
    updatableData.price = typeof this.price === 'number' && this.price ? this.price : null;
    updatableData.stock = typeof this.stock === 'number' ? this.stock : null;

    Object.entries(updatableData).forEach(([key, value]) => { if (!value) delete updatableData[key] });

    if (!Object.keys(updatableData).length) throw new Error('No updatable data provided');
    return ProductTable.update(
      { id: this.id, provider: this.provider },
      updatableData,
    );
  }
}

module.exports = Product;