const jwt = require('jsonwebtoken');
const config = require('../../config/config');

function jwtClaims(user) {
  return {
    sub: user.id,
    email: user.email,
  };
}

module.exports = {
  cookieName: 'auth_cookie',

  async signUser(user) {
    try {
      return await jwt.sign(jwtClaims(user), config.authentication.jwtSecret, {
        expiresIn: '7 days',
      });
    } catch (err) {
      console.log(err);
      console.log('Could not create jwt token');
    }

    return null;
  },

  async verifyUser(jwtToken) {
    let user = null;

    try {
      userJwt = await jwt.verify(jwtToken, config.authentication.jwtSecret);
    } catch (err) {
      console.log(err);
      console.log(`Invalid JWT token sent ${jwtToken}`);
    }

    return userJwt;
  },
};
