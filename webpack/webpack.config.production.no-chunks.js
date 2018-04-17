const base = require('./webpack.config.base');
const webpackUtils = require('./utils/webpack-utils');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {out, chunkName} = base;

const extractCSS = new ExtractTextPlugin({
    filename: chunkName + '.css'
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
                                sourceMap: true
                            }
                        }
                    ],
                })
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash].[ext]',
                }
            },
            /* optimize images
            {
                test: /\.(png|jp(e*)g)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'static/img/[name]-[hash:4].[ext]',
                        fallback: 'responsive-loader'
                    }
                }]
            },
            /* */
        ]
    },
    plugins: [
        new CleanWebpackPlugin([out + '/*'], {root: out}),
        extractCSS
    ]
});