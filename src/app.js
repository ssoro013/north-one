const express = require('express')
const compression = require('compression')
const flash = require('connect-flash')
const morgan = require('morgan')
const cors = require('cors')

const connection = require('../database/db')
const routes = require('./routes/api.js')

const app = express()

// Express middleware
app.use(compression())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

// set static folder
app.use(express.static('public'))
app.use(flash())

// routes
app.use('/', routes)

//error handling middleware
app.use(function(err, req, res, next) {
    console.log('error:', err)
    res.status(err.status).json({
        status: 'error',
        message: 'Oops something went wrong. Please try again later.',
        data: req.body
    })
})

//database connection
async function connect () {
    try {
        await connection.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

connect()

module.exports = app
