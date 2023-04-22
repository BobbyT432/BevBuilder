const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {
    // based off of subus lecture, but this is where we will put specific functions for tables
    static async find_user(username, password){
        try {
            const user = await User.findByPk(username)

            if (user && user.password === password){
                return user;
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

User.init({
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: { // ENCRYPT THIS
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'User'
  });

module.exports = User