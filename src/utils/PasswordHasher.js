const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcryptjs'));
const SALT_FACTOR = 8;

async function hashPassword(password) {
  let salt = await bcrypt.genSalt(SALT_FACTOR);
  let hash = await bcrypt.hash(password, salt, null);
  return hash;
}

module.exports = hashPassword;
