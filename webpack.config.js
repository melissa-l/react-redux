var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  entry: ["./app/index.jsx"],//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },

  module: {
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: "json-loader"},
      { test: /\.jsx$/,exclude: /node_modules/,loader: "babel-loader",query: {presets: ['es2015', 'react', 'stage-0']}},
      { test: /\.js$/,exclude: /node_modules/, loader: "babel-loader",query: {presets: ['es2015', 'stage-0']}},
      { test: /\.css$/,exclude: /node_modules/,use: ['style-loader','css-loader']},
      { test: /\.less$/,exclude: /node_modules/,use: ['style-loader','css-loader','less-loader']},
      { test: /\.(png|gif|jpg|jpeg|bmp)$/i, exclude: /node_modules/, loader:'url-loader?limit=5000' },  // 限制大小5kb
      { test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, exclude: /node_modules/, loader:'url-loader?limit=5000'} // 限制大小小于5k
    ]
  },

  plugins: [
      new webpack.BannerPlugin("Copyright helloint org."),//在这个数组中new一个就可以了
      // html 模板插件
      new HtmlWebpackPlugin({
          template: __dirname + '/app/index.tmpl.html'
      }),

      // 热加载插件
      new webpack.HotModuleReplacementPlugin(),

      // 打开浏览器
      new OpenBrowserPlugin({
        url: 'http://localhost:8080'
      }),

      // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
      })

  ],

  devServer: {
      stats: { colors: true },
      //colors: true, 终端中输出结果为彩色
      historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
      inline: true, //实时刷新
      hot: true,  // 使用热加载插件 HotModuleReplacementPlugin
      proxy: {
        // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
        // koa 代码在 ./mock 目录中，启动命令为 npm run mock
        '/api': {
          target: 'http://localhost:3000',
          secure: false
        }
      }
  }
}
