const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Comment extends Model {}

Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize, 
    modelName: 'Comment'
  });

module.exports = Comment