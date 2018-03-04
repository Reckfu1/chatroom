// 虽然node7.6后支持async/await了，但为了在node端使用es6,特别是import，,参考icyfish.me/2017/05/18/babel-preset-env/ 以及笔记
// babel-register或babel-core/register改写了require，为require加上一个钩子，之后每当require加载.es6,.es,.jsx,.js文件都会先被Babel转码
// 因此node server-entry.js就可以运行的就是通过babel编译后的app.js
// 最新版的babel-preset-env为转码规则，充当插件
require('babel-core/register')({
  'presets': [
    ['env', {
      'targets': {
        // 使用Babel实时编译node代码，方便起见，将Babel要运行的node版本声明为当前node版本
        'node': true
      }
    }]
  ]
})

require('./server/app')