
const {basename} = require('path');
const request = require( 'request' );
const DownloadGitRepo = require( 'download-git-repo' );
const {dirs} = require('../config/constant');

/**
 * git操作类
 */
class gitCtrl {
	constructor( type, registry ) {
		this.type = type
		this.registry = registry
	}

	/**
	 * request Promise封装 方便调用
	 * @param  {[string]} api [地址]
	 * @param  {[string]} ua [User-Agent]
	 * @return {[type]}     [description]
	 */
	fetch( api, ua ) {
		return new Promise( ( resolve, reject ) => {
			request( {
				url: api,
				method: 'GET',
				headers: {
					'User-Agent': `${ua}`
				}
			}, ( err, res, body ) => {
				if ( err ) {
					reject( err );
					return;
				}
				const data = JSON.parse( body );
				if ( data.message === 'Not Found' ) {
					reject( new Error( `${api} is not found` ) );
				} else {
					resolve( data );
				}
			} );
		} );
	}

	/**
	 * 获取git仓库列表
	 */
	async fetchRepoList() {
		const api = `https://api.github.com/${this.type}s/${this.registry}/repos`;
		return await this.fetch( api );
	}


	/**
	 * 获取仓库详细信息
	 * @param  {[string]} repo [仓库名称]
	 * @return {[type]}      [description]
	 */
	async fetchGitInfo( repo ) {
		let template = repo;
		let [ scaffold ] = template.split( '@' );

		scaffold = basename( scaffold );

		template = template.split( '@' )
			.filter( Boolean )
			.join( '#' );
		const url = `${this.registry}/${template}`;
		return {
			url,
			scaffold
		};
	}

	/**
	 * 下载git仓库代码到指定文件夹
	 * @param  {[type]} repo [description]
	 * @return {[type]}      [description]
	 */
	async downloadGitRepo( repo ) {
		const {
			url,
			scaffold
		} = await this.fetchGitInfo( repo );

        console.log(repo, url, scaffold);
		return new Promise( ( resolve, reject ) => {
			DownloadGitRepo( url, `${dirs.download}/${scaffold}`, ( err ) => {
				if ( err ) {
					reject( err );
					return;
				}
				resolve( true );
			} );
		} );
	}
}

module.exports = {
    gitCtrl
};

