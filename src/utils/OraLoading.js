
var ora = require('ora');

//node 终端系统的loading组件
const OraLoading = function (action = 'getting', repo = '') {
    const l = ora(`${action} ${repo}`);
    return l.start();
};

module.exports = {
    OraLoading
};
