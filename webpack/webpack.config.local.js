var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var base = require('./webpack.config.base');
var webpackUtils = require('./utils/webpack-utils');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackUtils.merge(base.defaults, {
    entry: {
        bundle: [
            'element-closest',
            'webpack-dev-server/client?http://localhost:3333',
            'webpack/hot/only-dev-server',
            './demo/app'
        ]
    },
    output: {
        path: path.join(__dirname, './../dist'),
        publicPath: 'http://localhost:3333/',
        filename: '[name].js'
    },
    resolve: {
        root: [
            path.resolve('demo')
        ]
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loaders: ['eslint'], include: [path.resolve('src'), path.resolve('demo')]}
        ],
        loaders: [
            {test: /\.js$/, loaders: ['react-hot', 'babel'], include: [path.resolve('src'), path.resolve('demo')]},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?outputStyle=compact'), include: [path.resolve('src'), path.resolve('demo')]},
            {test: /\.png$/, loader: 'file', include: [path.resolve('src'), path.resolve('demo')]},
            {test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=100000', include: [path.resolve('src'), path.resolve('demo')]}
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'template.html'
        })
    ]
});