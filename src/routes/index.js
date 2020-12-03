const RegisterRouter = require('./RegisterRouter')
const LoginRouter = require('./LoginRouter')

module.exports = function (app) {
  app.use('/register', RegisterRouter)
  app.use('/login', LoginRouter)
}
