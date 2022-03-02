const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    },
    deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at'
    },
}, {
    tableName: 'categories',
    paranoid: true, // soft delete
    getterMethods: {

    },
    classMethods: {
        massAssignableAttributes: ['value', 'type']
    }
})

module.exports = Category
