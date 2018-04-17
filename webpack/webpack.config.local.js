const base = require('./webpack.config.base');
const webpackUtils = require('./utils/webpack-utils');
const webpack = require('webpack');

module.exports = webpackUtils.merge(base.defaults, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: false,
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: false,
                            sourceMap: true
                        }
                    },
                    {
                        // source maps are required for TextLoader plugin
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
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
    },
    devServer: {
        publicPath: '/',
        hotOnly: true,
        inline: true,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
});

