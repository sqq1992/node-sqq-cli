var program = require( 'commander' );
var inquirer = require( 'inquirer' );
var {gitCtrl} = require('../utils/gitCtrl');
var config = require( '../config' );
var {OraLoading} = require('../utils/OraLoading');

// 初始化git操作类
let git = new gitCtrl( config.repoType, config.registry )

program
	.command( 'install' )
	.description( 'install github project to local' )
	.action( async ( options ) => { //list命令的实现体
		// to do
        let version, choices, repos, loader;
        loader = OraLoading('fetch repo list');

		//加载远程列表们
		repos = await git.fetchRepoList();
		loader.succeed( 'fetch repo list success' );

		if ( repos.length === 0 ) {
            throw new Error(`暂无找到任何远程分支 https://github.com/${config.registry}.`);
		}

		choices = repos.map( ( {
			name
		} ) => name );

		let questions = [ {
			type: 'list',
			name: 'repo',
			message: 'which repo do you want to install?',
			choices
		}];

		// 调用问题
		let answers = await inquirer.prompt( questions )

		// 取出选择的git仓库
		const repo = answers.repo;


		console.log( answers ); // 输出最终的答案
		loader = OraLoading( 'begin download repo' )
		let result = await git.downloadGitRepo( repo );

        console.log('result', result);

        loader.succeed('download repe success');
	} );
program.parse( process.argv );
