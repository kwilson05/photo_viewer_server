const SecureCookieOptions = require('../policies/SecureCookieOptions');
const JWT = require('../policies/JWT');
const UserDbo = require('../models/UserDbo');
const passwordHasher = require('../utils/PasswordHasher');

module.exports = {
  async register(req, res) {
    try {
      const hashPassword = await passwordHasher(req.body.password);
      const user = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
      };
      console.log(user);
      /*await UserDbo.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
      });*/

      const token = await JWT.signUser(user);

      res.cookie(JWT.cookieName, token, SecureCookieOptions.cookieOptions());
      res.send({
        email: user.email,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: 'This email account or username is already in use',
      });
    }
  },
};
