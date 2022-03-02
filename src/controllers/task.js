const Task = require('../../database/models/task');
const SubTask = require('../../database/models/subtask');
const Sequelize = require('sequelize');

module.exports = {
    create: (req, res) => {
        const userId = req.params.id
        const {title, description, status, categories, due} = req.body
        return Task.create({
            userId, title, description, status, categories, due
        })
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: 'task successfully added',
                data: req.body
            })
        })
    },
    update: (req, res) => {
        const taskId = req.params.task_id
        const {title, description, status, due} = req.body
        return Task.update(
            {title, description, status, due},
            {where: {id: taskId}},
        )
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: 'task successfully updated',
                data: req.body
            })
        })
    },
    assignCategory: (req, res) => {
        const taskId = req.params.id
        return Task.update(
            {categories: Sequelize.fn('array_append', Sequelize.col('categories'), req.body.category)},
            {where: {id: taskId}}
        )
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: 'category successfully assigned',
                data: req.body
            })
        })
    },
    updateStatus: (req, res) => {
        const taskId = req.params.id
        const {status} = req.body
        return Task.update(
            {status: status},
            {where: {id: taskId}}
        )
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: 'status successfully updated',
                data: req.body
            })
        })
    },
    remove: (req, res) => {
        const taskId = req.params.task_id
        return Promise.all([
            Task.destroy({
               where:{id: taskId}
            }),
            SubTask.destroy({
                where: {
                    task_id: taskId
                }
            })
        ])
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'task successfully removed',
                data: req.body
            })
        })
    },
}