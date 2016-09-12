var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var defaults = {
    clearBeforeBuild: true,
    resolve: {
        root: [
            path.resolve('src')
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([{
            from: path.resolve('src/assets/scss'),
            to: path.resolve('lib/sass')
        }])
    ],
    module: {
        noParse: [/autoit.js/]
    },
};

module.exports.defaults = defaults;