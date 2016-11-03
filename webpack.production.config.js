var webpack = require('webpack');
var path = require('path');
var glob = require("glob");

module.exports = {
  content: path.resolve(__dirname, 'source'),
  devtool: 'cheap-module-source-map',
  entry: './source/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, '.dist','javascripts'),
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: [/node_modules/,/source\/javascripts\/lib/]
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  /* プラグインの設定 */
  plugins: [
    /* DefinePluginの実行 */
    new webpack.DefinePlugin({
      // process.env.NODE_ENVを'production'に置き換える
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    /* UglifyJsPluginの実行 */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        unused: true,
        warnings: true
      }
    })
  ]
};
