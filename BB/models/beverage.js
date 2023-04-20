const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Beverage extends Model {}

Beverage.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'Beverage'
  });

module.exports = Beverage