const UserDbo = require('../models/UserDbo');
const SecureCookieOptions = require('../policies/SecureCookieOptions');
const JWT = require('../policies/JWT');
const passwordComparer = require('../utils/PasswordComparer');

module.exports = {
  async get(req, res) {
    try {
      if (req.headers.authorization) {
        let user = await JWT.verifyUser(req.headers.authorization);
        res.send({ user: { id: user.sub, email: user.email } });
      } else {
        return res.status(403).send({
          error: "You're not allowed to access this page",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Couldn't send user",
      });
    }
  },
};
