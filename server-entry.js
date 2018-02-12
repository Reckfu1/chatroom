// babel-register或babel-core/register改写了require，为require加上一个钩子，之后每当require加载.es6,.es,.jsx,.js文件都会先被Babel转码
// 因此node server-entry.js就可以运行的就是通过babel编译后的app.js
// 最新版的babel-preset-env充当插件
require('babel-core/register')({
  "presets":["env"]
})

require('./server/app')