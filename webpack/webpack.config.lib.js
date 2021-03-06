var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config.base');
var webpackUtils = require('./utils/webpack-utils');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackUtils.merge(base.defaults, {
    entry: {
        bundle: [
            './src/index'
        ]
    },
    output: {
        path: path.join(__dirname, './../lib'),
        filename: 'index.js',
        library: 'rosemary-ui',
        libraryTarget: 'umd'
    },
    externals: [
        {
            'react': {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }
    ],
    module: {
        preLoaders: [
            {test: /\.js$/, loaders: ['eslint'], include: [path.resolve('src')]}
        ],
        loaders: [
            {test: /\.js$/, loaders: ['babel'], include: [path.resolve('src')]},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), include: [path.resolve('src')]},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?outputStyle=compact'), include: [path.resolve('src')]},
            {test: /\.png$/, loader: 'file', include: [path.resolve('src')]},
            {test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=100000', include: [path.resolve('src')]}
        ]
    }
});
