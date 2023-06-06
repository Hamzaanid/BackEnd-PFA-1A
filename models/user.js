'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    role: {
      type: DataTypes.ENUM('admin', 'prof', 'etudiant'),
      allowNull: false,
      defaultValue:'etudiant'
    },
    dateDeNaissance: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};