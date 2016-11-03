var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var moment = require('moment')

let load = (module) => ['webpack-hot-middleware/client', './js/' + module]

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: load('index'),
    nav: load('nav'),
    styles: load('styles')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-' + moment().format('YYYY-MM-DD') + '.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'FORMBUCKET_API_SERVER': JSON.stringify('http://fb-dev:3002')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'js')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
        test: /\.md$/,
        loader: 'raw'
    }]
  }
};
