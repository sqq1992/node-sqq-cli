
var ora = require('ora');

const OraLoading = function (action = 'getting', repo = '') {
    const l = ora(`${action} ${repo}`);
    return l.start();
};

module.exports = {
    OraLoading
};
