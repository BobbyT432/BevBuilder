const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/bbdb.sqlite'
})

module.exports = sequelize