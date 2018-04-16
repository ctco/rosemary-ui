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
                                sourceMap: true
                            }
                        }
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
                    fallback: {
                        loader: 'style-loader',
                    }
                })
            }
        ]
    },


    plugins: [
        new CleanWebpackPlugin([out + '/*'], {root: out}),
        extractCSS,
        extractSass
    ]
});