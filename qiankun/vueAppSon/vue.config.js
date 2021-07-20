
const {name} = require('./package.json')

module.exports  = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 7000
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
}