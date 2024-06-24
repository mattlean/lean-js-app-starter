const compileReactTs = require('ljas-webpack/compileReactTs')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_BACKEND_BUILD_PROD, PATH_ROOT, PATH_SRC } = require('../PATHS')

module.exports = merge([
    {
        output: { path: PATH_BACKEND_BUILD_PROD },
    },

    buildSourceMaps('source-map'),

    compileReactTs({
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.backend.js`,
        },
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/**/*'],
                    ...tsconfigBuildOverride,
                },
            },
        },
    }),
])
