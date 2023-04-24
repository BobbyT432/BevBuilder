const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class UserSaveBev extends Model {}

UserSaveBev.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bev_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'UserSaveBev'
  });

module.exports = UserSaveBev