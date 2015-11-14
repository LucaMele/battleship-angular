var crypto = require('crypto');

/**
 *
 * @param string
 * @returns {*}
 */
var md5 = function(string) {
    var md5sum = crypto.createHash('md5');
    return  md5sum.update(string).digest("hex");
};


module.exports = {
  md5: md5
};