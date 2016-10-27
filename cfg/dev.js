'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

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
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

config.output.publicPath = defaultSettings.publicPath;

module.exports = config;
