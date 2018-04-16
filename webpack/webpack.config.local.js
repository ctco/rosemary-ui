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
        new webpack.NoEmitOnErrorsPlugin()
    ]
});