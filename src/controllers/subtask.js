const SubTask = require('../../database/models/subtask')

module.exports = {
    create: (req, res) => {
        const taskId = req.params.id
        const {title, description, status, due} = req.body
        return SubTask.create({
            taskId, title, description, status, due
        })
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: 'subtask successfully added',
                data: req.body
            })
        })
        .catch(err => {
            console.log(err)
            res.status('400').json({
            status: 'error',
            message: 'error creating subtask',
            data: req.body
            })
        })
    }
}
