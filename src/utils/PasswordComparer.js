const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcryptjs'));

async function compare(textPassword, hashedPassword) {
  return await bcrypt.compare(textPassword, hashedPassword);
}

module.exports = compare;
