const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Ingredient extends Model {}

Ingredient.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'Ingredient'
  });

module.exports = Ingredient