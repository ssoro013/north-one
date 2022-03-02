const User      = require('../../database/models/user');
const Task      = require('../../database/models/task');
const Sequelize = require('sequelize');

module.exports = {
    create: (req, res) => {
        const {firstName, lastName, email} = req.body
        return User.create({
            firstName, lastName, email
        }) 
        .then(response => {
            console.log()
            res.status(200).json({
                status: 'success',
                message: 'user successfully created',
                data: req.body
            })
        })
        .catch(err => {
            console.log(err)
            res.status('400').json({
            status: 'error',
            message: 'error creating user',
            data: req.body
            })
        })
    },
    getByStatus: (req, res) => {
        const userId = req.params.id
        const {status} = req.query
        return Task.findAll(
            { where: 
                {user_id: userId, status: status,}, 
            }
        )
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: `user tasks of status ${status}`,
                data: response
            })
        })
    },
    getByDueDate: (req, res) => {
        const userId = req.params.id
        const dueDate = req.query.due_date
        return Task.findAll(
            { where: 
                {
                    [Sequelize.Op.and]: [
                        {user_id: userId},
                        Sequelize.where(Sequelize.fn('date', Sequelize.col('due')), '=', dueDate)

                    ]
                },
            }
        )
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: `user tasks due on ${dueDate}`,
                data: response
            })
        })
    }
}
