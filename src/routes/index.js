const RegisterRouter = require('./RegisterRouter');
const LoginRouter = require('./LoginRouter');
const UserRouter = require('./UserRouter');
const ImageRouter = require('./ImageRouter');

module.exports = function(app) {
  app.use('/register', RegisterRouter);
  app.use('/login', LoginRouter);
  app.use('/user', UserRouter);
  app.use('/image', ImageRouter);
};
