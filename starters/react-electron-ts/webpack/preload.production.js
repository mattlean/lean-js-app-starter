const compileTs = require('ljas-webpack/compileTs')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
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

    compileTs({
        rule: {
            include: [PATH_COMMON_SRC, PATH_PRELOAD_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.renderer.production.js`,
        },
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/preload/**/*', 'src/global.d.ts'],
                    ...tsconfigBuildOverride,
                },
            },
        },
    }),
])
