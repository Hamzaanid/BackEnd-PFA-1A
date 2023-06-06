'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reclamation extends Model {
    static associate(models) {
    }
  }
  Reclamation.init({
    title: DataTypes.STRING,
    detail: DataTypes.TEXT,
    isTraited : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reclamation',
  });
  return Reclamation;
};