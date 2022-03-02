const { Sequelize } = require('sequelize')
const db = require('../config/database.js')

const env = process.env.NODE_ENV || 'development'
const config = db[env]

const connection = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
        idle: 10000
        }
    }
)

module.exports = connection;
