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
    },
    // Rating: { // TEST
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   defaultValue: 0
    // }
    rating: { // TEST
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('rating', value);
      }
    }

  }, {
    sequelize, 
    modelName: 'Beverage'
  });

module.exports = Beverage