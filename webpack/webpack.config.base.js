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
        app: [
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
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'font/[name]-[hash].[ext]',
                    fallback: 'file-loader'
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
    ],
    optimization: {
        //runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /(react|fbjs)/,
                    chunks: 'all',
                    name: 'react',
                    enforce: true
                },
                jscore: {
                    test: /core-js/,
                    chunks: 'all',
                    name: 'jscore',
                    enforce: true
                },
                lodash: {
                    test: /lodash/,
                    name: 'lodash',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
};

module.exports = {
    out,
    chunkName,
    defaults
};
