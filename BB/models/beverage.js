const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

// Models
const BevCom = require('./bevcom');
const Comment = require('./comment');
const Usersavebev = require('./usersavebev');
const BevIng = require('./beving');

class Beverage extends Model {
  /* Helper Functions */
  static async find_bev(bevID) {
    try {
      const bev = await Beverage.findByPk(bevID)

      if (bev) {
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

  static async get_avg(bevID) {
    try {
      const bev = await Beverage.findByPk(bevID)

      if (bev) {
        let bevComments = [];
        let sum = 0.0;
        const comments = await BevCom.findAll({
          where: {
            bev_id: bev.id
          }
        });
        if (comments) {
          for (let i = 0; i < comments.length; i++) {
            const com = await Comment.findByPk(comments[i].com_id);
            bevComments.push(com);
          }
        }

        // Calculate average
        for (let i = 0; i < bevComments.length; i++) {
          sum += bevComments[i].rating;
        }
        return ((sum === 0) ? sum : (sum / bevComments.length));
      }

      else {
        return null;
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  static async get_comments(bevID) {
    const myCommentsID = await BevCom.findAll({
      where: {
        bev_id: bevID
      }
    })
    let myList = []
    // for (let i = 0; i < myCommentsID.length; i++){
    //   const myComment = await Comment.findByPk(myCommentsID[i].com_id)
    //   myList.push(myComment)
    // }
    for (let item of myCommentsID) {
      const myComment = await Comment.findByPk(item.com_id)
      myList.push(myComment)
    }
    const bevAllComments = myList
    return bevAllComments
  }

  static async deleteBeverage(bevID) {
    //delete saved
    const savedBevs = await Usersavebev.findAll({
      where: {
        bev_id: bevID
      }
    })
    for (let toDelete of savedBevs){
      Usersavebev.destroy({
        where: {
          id: toDelete.id
        }
      })
    }

    //delete ingred
    const ingBevs = await BevIng.findAll({
      where: {
        bev_id: bevID
      }
    })
    for (let toDelete of ingBevs){
      BevIng.destroy({
        where: {
          id: toDelete.id
        }
      })
  }
}

}

Beverage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
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
  rating: { // TEST
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    set(value) {
      this.setDataValue('rating', value);
    }
  }

}, {
  sequelize,
  modelName: 'Beverage'
});

module.exports = Beverage