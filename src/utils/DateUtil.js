const { DateTime } = require('luxon');

module.exports.getDateByIso = function(isoDate) {
  return DateTime.fromISO(isoDate).toJSDate();
};
