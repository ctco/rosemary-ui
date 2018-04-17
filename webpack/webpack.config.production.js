/* TODO: Fix relative path Extract text loader bug */
const base = require('./webpack.config.base');
const webpackUtils = require('./utils/webpack-utils');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {out, chunkName} = base;

const extractCSS = new ExtractTextPlugin({
    filename: 'css/' + chunkName + '.css'
});

const extractSass = new ExtractTextPlugin({
    filename: 'css/' + chunkName + '.sass.css'
});

module.exports = webpackUtils.merge(base.defaults, {
    mode: 'production',
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true,
                                relativeUrls: true,
                            }
                        },
                        'resolve-url-loader'
                    ],
                    fallback: {
                        loader: 'style-loader',
                    }
                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true,
                                relativeUrls: false,
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ],
                    fallback: {
                        loader: 'style-loader',
                    }
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    //limit: 8192,
                    name: 'font/[name]-[hash].[ext]',
                    //fallback: 'file-loader'
                }
            }
        ]
    },


    plugins: [
        new CleanWebpackPlugin([out + '/*'], {root: out}),
        extractCSS,
        extractSass
    ]
});