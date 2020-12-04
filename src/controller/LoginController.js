const UserDbo = require('../models/UserDbo');
const SecureCookieOptions = require('../policies/SecureCookieOptions');
const JWT = require('../policies/JWT');
const passwordComparer = require('../utils/PasswordComparer');

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const foundUser = await UserDbo.findByEmail(email);

      if (!foundUser) {
        return res.status(403).send({
          error: 'The login information was incorrect',
        });
      }

      //compare user entered password vs hashed password
      const isPasswordValid = await passwordComparer(
        password,
        foundUser.password
      );

      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect',
        });
      }

      const token = await JWT.signUser(userJson);

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
