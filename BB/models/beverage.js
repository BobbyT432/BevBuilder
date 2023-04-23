const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

// Models
const BevCom = require('./bevcom');
const Comment = require('./comment');

class Beverage extends Model {
  static async find_bev(bevID){
    try {
        const bev = await Beverage.findByPk(bevID)

        if (bev){
            return bev;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
  }

  static async get_avg(bevID){
    try {
        const bev = await Beverage.findByPk(bevID)

        if (bev){
          let bevComments = [];
          let sum = 0.0;
          const comments = await BevCom.findAll({ 
            where: {
              bev_id: bev.id
            }
          });
          if (comments){
            for (let i = 0; i < comments.length; i++){
              const com = await Comment.findByPk(comments[i].com_id);
              bevComments.push(com);
            }
          }
        
        // Calculate average
        for (let i = 0; i < bevComments.length; i++){
          sum += bevComments[i].rating;
        }
        return ((sum === 0) ? sum : sum / bevComments.length);
        }

        else {
            return null;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
  }

}

Beverage.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: { // *****************THIS WILL CHANGE, IT MUST BE BY THE USER ID, NOT NAME*****************
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instr: { // instructions
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize, 
    modelName: 'Beverage'
  });

module.exports = Beverage