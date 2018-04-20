const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const chunkName = '[name]-[hash]';
const out = path.join(__dirname, './../dist');

const defaults = {
    resolve: {
        modules: ['demo', 'node_modules']
    },

    devtool: 'eval',

    entry: {
        bundle: [
            'element-closest',
            './demo/app'
        ]
    },

    output: {
        path: out,
        filename: 'js/' + chunkName + '.js',
        // publicPath: '/'
    },

    module: {
        noParse: [/autoit.js/],
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name]-[hash].[ext]'
                    }
                }
            }
        ]
    },

    devServer: {
        publicPath: '/',
        hotOnly: true,
        inline: true,
        historyApiFallback: true,
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'template.html'
        }),
    ]
};

module.exports = {
    out,
    chunkName,
    defaults
};
