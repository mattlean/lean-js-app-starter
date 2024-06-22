const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { compileJs } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_COMMON_SRC, PATH_MAIN_SRC, PATH_ROOT } = require('../PATHS')

module.exports = merge([
    {
        entry: { main: `${PATH_MAIN_SRC}/index.js` },

        output: {
            clean: true,
            filename: '[name].js',
        },

        target: 'electron29.1-main',
    },

    compileJs({
        rule: {
            include: [PATH_COMMON_SRC, PATH_MAIN_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.js$/,
                /__tests__\/.*.js$/,
                /\.(spec|test)\.js$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.main.js`,
        },
    }),

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])
