const RegisterRouter = require('./RegisterRouter');
const LoginRouter = require('./LoginRouter');

module.exports = function(app) {
  /*Registered via insomnia
  No one needs to register again for time being
  */
  //app.use('/register', RegisterRouter)
  app.use('/login', LoginRouter);
};
