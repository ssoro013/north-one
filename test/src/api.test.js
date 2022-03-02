const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../database/db');
const Task = require('../../database/models/task');
const User = require('../../database/models/user');
const Subtask = require('../../database/models/subtask');

describe('API', () => {
    var user;
    var task;
    var subtask;
    beforeAll(() => {
        return User.create({
            firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com'
        })
        .then(_user => {
            user =  _user
            return Task.create({
                userId: user.id,
                title: 'soccer',
                description: 'soccer match on the weekend',
                categories: ['sports'],
                due: '2022-03-01 00:00:0'
            })
        })
        .then(_task => {
            task = _task
            return Subtask.create({
                taskId: task.id,
                title: 'soccer',
                description: 'first soccer game of the weekend',
                status: 'open',
                due: '2022-02-27 00:00:0'
            })
        })
        .then(_subtask => {
            subtask = _subtask
        })
    })
    afterAll(done => {
        connection.close()
        done()
    })

    describe('User API', () => {
        it('creates user', () => {
            const data = {
                firstName: 'Joe',
                lastName: 'Doe',
                email: 'joe.doe@gmail.com'
            }
            return request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('user successfully created')
            })
        })

        it('retuns all the tasks for a given user by status', () => {
            return request(app)
            .get(`/users/${user.id}/tasks/status`)
            .query({status: 'open'})
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('user tasks of status open')
                expect(response.body.data.length).toEqual(1)
            })
        })
        
        it('retuns all the tasks for a given user by due date', () => {
            const dueDate = '03-01-2022'
            return request(app)
            .get(`/users/${user.id}/tasks/due`)
            .query({due_date: dueDate})
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual(`user tasks due on ${dueDate}`)
                expect(response.body.data.length).toEqual(1)
            })
        })
    })
    describe('Tasks API', () => {
        it('creates task', () => {
            const data = {
                title: 'tennis',
                description: 'tennis match on the weekend',
                categories: ['sports'],
                due: '2022-03-01 00:00:0'
            }
            return request(app)
            .post(`/users/${user.id}/tasks`)
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('task successfully added')
            })
        })
        
        it('updates task', () => {
            const data = {
                title: 'biking',
                description: 'weekend biking fun',
                categories: ['sports'],
                status: 'on hold',
                due: '2022-03-01 00:00:0'
            }
            return request(app)
            .put(`/users/${user.id}/tasks/${task.id}`)
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('task successfully updated')
                expect(response.body.data.title).toEqual(data.title)
                expect(response.body.data.description).toEqual(data.description)
                expect(response.body.data.status).toEqual(data.status)
            })
        })

        it('updates task categories', () => {
            const data = {
                category: "workout"
            }
            return request(app)
            .put(`/tasks/${task.id}/category`)
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('category successfully assigned')
            })
        })
        
        it('updates task status', () => {
            const data = {
                status: 'done',
            }
            return request(app)
            .put(`/tasks/${task.id}/status`)
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('status successfully updated')
            })
        })
        
        it('removes tasks', () => {
            return request(app)
            .delete(`/users/${user.id}/tasks/${task.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                console.log('task', task)
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('task successfully removed')
            })
        })
    })
    
    describe('SubTasks API', () => {
        it('creates subtask', () => {
            const data = {
                title: 'tennis',
                description: 'first tennis match on the weekend',
                status: 'open',
                due: '2022-03-01 00:00:0'
            }
            return request(app)
            .post(`/tasks/${task.id}/subtasks`)
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('subtask successfully added')
            })
        })
    })
})