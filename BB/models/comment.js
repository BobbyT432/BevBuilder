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
    }
  }, {
    sequelize, 
    modelName: 'Comment'
  });

module.exports = Comment