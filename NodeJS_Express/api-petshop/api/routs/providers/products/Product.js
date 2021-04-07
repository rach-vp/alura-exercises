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
}

module.exports = Product;