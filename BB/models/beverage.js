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
}

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