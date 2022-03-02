const Sequelize = require('sequelize')
const db = require('../db')

const SubTask = db.define('subtask', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    taskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'task_id',
        references: { model: 'tasks', key: 'id' }
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
    tableName: 'subtasks',
    paranoid: true, // soft delete
    getterMethods: {

    },
    classMethods: {
        massAssignableAttributes: ['value', 'type']
    }
})

module.exports = SubTask
