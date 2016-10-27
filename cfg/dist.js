'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let AssetsPlugin = require('assets-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');
let S3Plugin = require('webpack-s3-plugin');
let fs = require('fs');

let config = Object.assign({}, baseConfig, {
    entry: path.join(__dirname, '../src/index.js'),
    cache: false,
    devtool: 'eval',
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        // new CompressionPlugin({
        //     asset: '[path][query]',
        //     algorithm: 'gzip',
        //     test: /\.js$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // }),
        new AssetsPlugin(),
        //new S3Plugin({
        //    s3Options: {
        //        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        //        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        //        region: 'ap-southeast-2',
        //    },
        //    s3UploadOptions: {
        //        Bucket: process.env.AWS_FRONTEND_BUCKET_NAME,
        //        CacheControl: 'max-age=315360000, no-transform, public',
        //        ContentEncoding: 'gzip'
        //    }
        //}),
        function() {
            this.plugin('done', function(statsData) {
                var stats = statsData.toJson();

                var assetsInfo = JSON.parse(fs.readFileSync(path.join(__dirname, './../webpack-assets.json'), 'utf8'));
                console.info(assetsInfo);

                if (!stats.errors.length) {
                    var htmlFileName = './../dist/index.html';
                    var html = fs.readFileSync(path.join(__dirname, htmlFileName), 'utf8');

                    var htmlOutput = html.replace(/<script\s+src=(["'])(.+?)app\.js\1/i, '<script src=' + assetsInfo.main.js);

                    fs.writeFileSync(path.join(__dirname, htmlFileName), htmlOutput);
                }
            });
        }
    ],
    module: defaultSettings.getDefaultModules()
});

config.output.publicPath = defaultSettings.publicPath;
config.output.filename = '[name]-gh-bundle-[hash].js',

module.exports = config;
