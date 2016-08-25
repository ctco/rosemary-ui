var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var defaults = {
    clearBeforeBuild: true,
    resolve: {
        root: [
            path.resolve('src')
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};

module.exports.defaults = defaults;
