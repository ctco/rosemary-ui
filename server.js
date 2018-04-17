const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack/webpack.config.local');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3333, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3333/');
});
