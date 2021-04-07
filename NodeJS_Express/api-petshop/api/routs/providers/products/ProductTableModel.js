const Sequelize = require('sequelize');
const instance = require('../../../database');

const columns = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  provider: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require('../ProvidersTableModel'),
      key: 'id',
    },
  }
}

const options = {
  freezeTableName: true,
  tableName: 'products',
  timestamps: true,
  createdAt: 'dateCreation',
  updatedAt: 'dateUpdate',
  version: 'version',
}

module.exports = instance.define('product', columns, options);
