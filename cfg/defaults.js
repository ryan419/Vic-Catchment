'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 7100;
function getDefaultModules() {
  return {
    preLoaders: [{
      test: /\.js$/,
      include: srcPath,
      loader: 'eslint-loader',
      exclude: [path.join(__dirname, '../src/kanvas')]
    }],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /.\js$/,
        loader: 'ng-annotate',
        include: [srcPath],
        exclude: [path.join(__dirname, '../src/kanvas')]
      },
      {
        test: /.\js$/,
        loader: 'babel-loader',
        presets: [
          'es2015',
          'stage-0'
        ],
        plugins: [
          'transform-runtime'
        ],
        include: [srcPath],
        exclude: [path.join(__dirname, '../src/kanvas')]
      },
      {
        test: /\.html$/,
        loader: 'html?interpolate'
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  host: 'localhost',
  getDefaultModules: getDefaultModules
};
