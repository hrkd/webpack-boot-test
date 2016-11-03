var webpack = require('webpack');
var path = require('path');
var glob = require("glob");

module.exports = {
  content: path.resolve(__dirname, 'source'),
  devtool: 'eval',
  entry: './source/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, '.dist','javascripts'),
    filename: 'bundle.js'
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
  }
};
