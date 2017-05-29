const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = (config, env) => {
    config = genDefaultConfig(config, env);
    config.resolve.extensions.push('.sass');

    config.module.loaders.push({
            test: /\.scss/,
            loader: 'style!css?importLoaders=1!sass'
        }
    );

    return config;
};