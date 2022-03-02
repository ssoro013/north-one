const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'last_name'
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING
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
    tableName: 'users',
    paranoid: true, // soft delete
    getterMethods: {

    },
    classMethods: {
        massAssignableAttributes: ['value', 'type']
    }
})

module.exports = User;