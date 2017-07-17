var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextPlugin('css/[name]-two.css');

module.exports = {
  entry: {
    app: path.resolve(__dirname + "/app/index.jsx"),//已多次提及的唯一入口文件
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: __dirname + "/build",
    filename: "./js/[name].[chunkhash:8].js"
  },

  module: {
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: "json-loader"},
      { test: /\.jsx$/,exclude: /node_modules/,loader: "babel-loader",query: {presets: ['es2015', 'react', 'stage-0']}},
      { test: /\.js$/,exclude: /node_modules/, loader: "babel-loader",query: {presets: ['es2015', 'stage-0']}},
      {test: /\.css$/,exclude: /node_modules/,use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])},
      {test: /\.less$/i,exclude: /node_modules/,use: extractLESS.extract([ 'css-loader', 'less-loader' ])},
      { test: /\.(png|gif|jpg|jpeg|bmp)$/i, exclude: /node_modules/,  loader:'url-loader?limit=5000&name=img/[name].[chunkhash:8].[ext]'},  // 限制大小5kb
      { test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, exclude: /node_modules/,loader:'url-loader?limit=5000&name=fonts/[name].[chunkhash:8].[ext]'} // 限制大小小于5k
    ]
},

plugins: [
  // webpack 内置的 banner-plugin
  new webpack.BannerPlugin("melissa"),
  // html 模板插件
  new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'
  }),
  // 定义为生产环境，编译 React 时压缩到最小
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),

  // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
  // new webpack.optimize.OccurenceOrderPlugin(),
  //代码压缩
  new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
  }),
  // 分离CSS,LESS和JS文件
  extractCSS,
  extractLESS,
  // 提供公共代码
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   filename: '/js/[name].[chunkhash:8].js'
  // }),
  // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
  })
 ]
}
