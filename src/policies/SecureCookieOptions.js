const config = require('../../config/config');

module.exports = {
  cookieOptions() {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);

    if (config.env == 'development') {
      return {
        httpOnly: true,
        domain: 'localhost',
        expires: expireDate,
        path: '/',
      };
    } else {
      return {
        httpOnly: true,
        domain: config.clientDomain,
        expires: expireDate,
        path: '/',
        sameSite: 'none',
        secure: true,
      };
    }
  },
};
