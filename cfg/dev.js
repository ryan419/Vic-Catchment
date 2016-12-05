'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
    'webpack/hot/dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/sw.js'),
    })
  ],
  module: defaultSettings.getDefaultModules()
});

config.output.publicPath = defaultSettings.publicPath;

module.exports = config;