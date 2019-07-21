const os = require( 'os' );
const {name, version, engines} = require('../../package');

// 系统user文件夹
const home = process.env[ ( process.platform === 'win32' ) ? 'USERPROFILE' : 'HOME' ];

// user agent
const ua = `${name}-${version}`;

/**
 * 文件夹定义
 * @type {Object}
 */
const dirs = {
	home,
	download: `${home}/.webpack-project`,
	rc: `${home}/.webpack-project`,
	tmp: os.tmpdir(),
	metalsmith: 'metalsmith'
};

/**
 * 版本
 * @type {Object}
 */
const versions = {
	node: process.version.substr( 1 ),
	nodeEngines: engines.node,
  [ name ]: version
};

module.exports = {
    ua,
    dirs,
    versions
};
