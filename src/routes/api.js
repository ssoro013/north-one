const express = require('express')

const router = express.Router()
const controllers = require('../controllers')

router.get('/ping', (req, res) => {
    res.send({
        name: 'north-one',
        version: '1.0.0'
    })
})

//users
router.post('/users', controllers.user.create)
router.get('/users/:id/tasks/status', controllers.user.getByStatus)
router.get('/users/:id/tasks/due', controllers.user.getByDueDate)

//tasks
router.post('/users/:id/tasks', controllers.task.create)
router.put('/users/:id/tasks/:task_id', controllers.task.update)
router.delete('/users/:id/tasks/:task_id', controllers.task.remove)
router.put('/tasks/:id/category', controllers.task.assignCategory)
router.put('/tasks/:id/status', controllers.task.updateStatus)

//subtasks
router.post('/tasks/:id/subtasks', controllers.subtask.create)

//categories
router.post('/categories', controllers.category.create)

module.exports = router;