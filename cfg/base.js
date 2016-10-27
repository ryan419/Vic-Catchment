'use strict';
let path = require('path');
let nib = require('nib');
let defaultSettings = require('./defaults');
let npmBase = path.join(__dirname, '../node_modules');
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, './../dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    inline: true,
    hot: true,
    info: true,
    historyApiFallback: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
  },
  resolve: {
    alias: {
      'angular-material-css': path.join(npmBase, 'angular-material/angular-material.css'),
      'animate.css': path.join(npmBase, 'animate.css/animate.css'),
      'material-icon-css': path.join(npmBase, 'material-design-iconic-font/dist/css/material-design-iconic-font.css')
    }
  },
  module: {},
  stylus: {
    import: [path.join(npmBase, 'nib/lib/nib/index.styl')],
    use: [nib()]
  },
  postcss: function () {
    return [
      require('autoprefixer')({
        browsers: ['last 2 versions', 'ie >= 10']
      })
    ];
  }
};
