var program = require( 'commander' );
var {gitCtrl} = require('../utils/gitCtrl');
var {OraLoading} = require('../utils/OraLoading');
var config = require( '../config' );
const {dirs} = require('../config/constant');
const {readdir, exists} = require('mz/fs');
var inquirer = require( 'inquirer' );

let git = new gitCtrl( config.repoType, config.registry )

program
    .command( 'test' )
    .description( 'init project for local' )
    .action( async function ( options ) { //list命令的实现体
        // to do


        // let repos = await git.fetchRepoList();
        //
        // let choices = repos.map(({
        //                              name
        //                          }) => name);
        // console.log('choices', choices);
        //
        // let questions = [ {
        //     type: 'list',
        //     name: 'repo',
        //     message: 'which repo do you want to install?',
        //     choices
        // }];
        //
        // let answers = await inquirer.prompt( questions )


        //test2
        const list = await readdir( dirs.download );

        console.log('list', list);


    } );
program.parse( process.argv ); //开始解析用户输入的命令
