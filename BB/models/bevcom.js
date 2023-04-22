const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class BevCom extends Model {}

BevCom.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    com_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bev_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'BevCom'
  });

module.exports = BevCom