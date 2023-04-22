// This is a relationship between beverage and ingredient, which specific ingredient ties to a specific beverage and how much of it
const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class BevIng extends Model {}

BevIng.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bev_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ing_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: { // how much of a specific ingredient is needed
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'BevIng'
  });

module.exports = BevIng