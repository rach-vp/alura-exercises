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
    name: {
      type: DataTypes.STRING,
      validate: {
        validatorFunc(data) {
          if (data.length < 3) throw new Error('Name must have more than 3 characters');
        }
      }
    },
    active: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid e-mail data',
        },
      },
    },
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