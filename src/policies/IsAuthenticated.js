const passport = require('passport')
const config = require('../config/config')


module.exports = async function (req, res, next) {
  jwt.verify(token, config.authentication.jwtSecret, { maxAge: "7 days" }, function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: 'You do not have access to this resource'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)

}
