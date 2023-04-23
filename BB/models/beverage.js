const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

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

  // static async findBevsByAuthor(bevAuthor){
  //   try {
  //     if (Beverage.findOne({
  //       where: {author: bevAuthor}
  //     }) != null){
  //       const bevs = Beverage.findAll({
  //         where: {author: bevAuthor}
  //       })
  //       console.log("MY BEVS HERE")
  //       console.log(bevs)
  //       return bevs
  //     } else{
  //       console.log("NONE HERE")
  //       return []
  //     }

  //   } catch (error) {
  //     console.log(error)
  //     return null;
  //   }
  // }
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
    }
  }, {
    sequelize, 
    modelName: 'Beverage'
  });

module.exports = Beverage