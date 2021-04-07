const Table = require('./ProductTable');

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

  async create() {
    const result = await Table.create({
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
    return await Table.delete(this.id, this.provider);
  }
}

module.exports = Product;