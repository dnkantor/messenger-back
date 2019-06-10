'use strict'

const authentication = require('./authentication')
const message = require('./message')
const user = require('./user')

module.exports = {
    authentication: authentication,
    message: message,
    user: user,
}