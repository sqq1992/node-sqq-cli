var program = require( 'commander' );
var inquirer = require( 'inquirer' );
var {resolve} = require('path');
const {readdir, exists} = require('mz/fs');
var config = require( '../config' );
const {dirs} = require('../config/constant');
const rmfr = require( 'rmfr' );
const {copyFile} = require('../utils/utils');
const metalsmithACtion = require('../utils/metalsmithACtion').apply;
const {OraLoading} = require('../utils/OraLoading');

program
	.command( 'init' )
	.description( 'init project for local' )
	.action( async ( options ) => { //list命令的实现体
		// to do
		console.log( 'init command' );
		let loader
		loader = OraLoading( 'check download dir' );
		if ( !await exists( dirs.download ) ) {
			throw new Error( `There is no ${dirs.download}, Please install a template` );
		}
		loader.succeed( 'check download dir success' )
		loader = OraLoading( 'read download dir' );
		const list = await readdir( dirs.download );
		loader.succeed( 'read download dir success' );
		if ( list.length === 0 ) {
			throw new Error( `本地没有下载过来文件 ${dirs.download}, install it` );
		}

		let questions = [
			{
				type: 'list',
				name: 'template',
				message: 'which template do you want to init?',
				choices: list
      }, {
				type: 'input',
				name: 'dir',
				message: 'project name',
				async validate( input ) {
					const done = this.async();
					if ( input.length === 0 ) {
						done( 'You must input project name' );
						return;
					}
					const dir = resolve( process.cwd(), input );
					if ( await exists( dir ) ) {
						done( 'The project name is already existed. Please change another name' );
					}
					done( null, true );
				}
      }
    ];
		const answers = await inquirer.prompt( questions )
		const metalsmith = config.metalsmith;
		if ( metalsmith ) {
			const tmp = `${dirs.tmp}/${answers.template}`;
			// 复制一份到临时目录，在临时目录编译生成
			loader = OraLoading( 'copy file to tmp dir' )
			await copyFile( `${dirs.download}/${answers.template}`, tmp );
			loader.succeed( 'copy file to tmp dir success' )
			await metalsmithACtion( answers.template );
			loader = OraLoading( 'compiling', answers.dir );
			await copyFile( `${tmp}/${dirs.metalsmith}`, answers.dir );
			await rmfr( tmp ); // 清除临时文件夹
		} else {
			loader = OraLoading( 'generating', answers.dir );
			await copyFile( `${dirs.download}/${answers.template}`, answers.dir );
		}
		loader.succeed( `generated ${answers.dir}` );
	} );
program.parse( process.argv );
