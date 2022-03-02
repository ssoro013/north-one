const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define('task', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        field: 'user_id'
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING
    },
    status: {
        allowNull: false,
        type: Sequelize.ENUM('open', 'in progress', 'on hold', 'done'),
        defaultValue: 'open'
    },
    categories: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    due: {
        allowNull: false,
        type: Sequelize.DATE
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
    tableName: 'tasks',
    paranoid: true, // soft delete
    getterMethods: {

    },
    classMethods: {
        massAssignableAttributes: ['value', 'type']
    }
});

module.exports = Task;
