'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {
      People.hasMany(
        models.Classes,
        { foreignKey: 'teacher_id' },
      );
      People.hasMany(
        models.Registrations,
        { foreignKey: 'student_id' },
      );
    }
  };
  People.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'People',
    paranoid: true,
    defaultScope: {
      where: { active: true },
    },
    scopes: {
      all: { where: {} },
    },
  });
  return People;
};