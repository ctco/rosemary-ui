var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var defaults = {
    clearBeforeBuild: true,
    resolve: {
        extension: ['.js', '.jsx'],
        root: [
            path.resolve('src')
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([
            {
                from: path.resolve('src/assets/scss'),
                to: path.resolve('lib/sass')
            },
            {
                from: path.resolve('src/assets/fonts'),
                to: path.resolve('lib/fonts')
            },
            {
                from: path.resolve('src/assets/imgs'),
                to: path.resolve('lib/imgs')
            },
            {
                from: path.resolve('src/index.d.ts'),
                to: path.resolve('lib/')
            }
        ])
    ],
    module: {
        noParse: [/autoit.js/]
    }
};

module.exports.defaults = defaults;