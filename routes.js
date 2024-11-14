'use strict'
const register = require('./handlers/register')
const login = require('./handlers/login')
const startParking = require('./handlers/startParking')
const stopParking = require('./handlers/stopParking')
const getUserParking = require('./handlers/getUserParking')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.post('/api/v1/register', register)
  app.post('/api/v1/login', login)
  app.put('/api/v1/start_parking', startParking)
  app.put('/api/v1//stop_parking', stopParking)
  app.get('/api/v1/get_parking', getUserParking)
}
