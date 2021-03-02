const Sequelize = require('sequelize');
const instance = require('../../database');

const columns = {
  provider: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM('food', 'toys'),
    allowNull: false,
  }
}

const options = {
  freezeTableName: true,
  tableName: 'providers',
  timestamps: true,
  createdAt: 'dateCreation',
  updatedAt: 'dateUpdate',
  version: 'version',
}

module.exports = instance.define('provider', columns, options);
