const UserDbo = require('../models/UserDbo');
const SecureCookieOptions = require('../policies/SecureCookieOptions');
const JWT = require('../policies/JWT');
const passwordComparer = require('../utils/PasswordComparer');

module.exports = {
  async get(req, res) {
    try {
      res.send({ user: { email: 'kasoziwilson@gmail.com' } });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Couldn't send user",
      });
    }
  },
};
