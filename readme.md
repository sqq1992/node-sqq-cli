


简介：制作1个cli(用node与终端交互,完成指定的工作!)
功能: 初始化一套模板代码

需要主要用到的工具库
commander: 命令行工具
download-git-repo: 用来下载远程模板
inquirer: 交互式命令行工具
ora: 显示loading动画


1.bin
系统里都会有1个path环境变量,当调用1个命令的时候,会在
Path变量中去寻找, 总而言之就是调用系统中的node去执行我们的脚步
2.package.json 中的 bin 字段可以定义命令名和关联的执行文件。在 package.json 中添加 bin 字段
3.执行npm link, 可以将命令链接到全局环境

(ps:node不支持import导入, 想用的话就要加入babel去编译, 考虑到项目不大, 不需编译, 所以直接就是开发代码发上去跑了)
