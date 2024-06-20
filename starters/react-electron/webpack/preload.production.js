const { buildSourceMaps, compileJs } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const {
    PATH_COMMON_SRC,
    PATH_PRELOAD_BUILD_PROD,
    PATH_PRELOAD_SRC,
    PATH_ROOT,
} = require('../PATHS')

module.exports = merge([
    {
        output: { path: PATH_PRELOAD_BUILD_PROD },
    },

    buildSourceMaps('source-map'),

    compileJs({
        rule: {
            include: [PATH_COMMON_SRC, PATH_PRELOAD_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.js$/,
                /__tests__\/.*.js$/,
                /\.(spec|test)\.js$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.renderer.production.js`,
        },
    }),
])
