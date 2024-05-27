const { buildSourceMaps, compileReact } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_BACKEND_BUILD_PROD, PATH_SRC } = require('../PATHS')

module.exports = merge([
    {
        output: { path: PATH_BACKEND_BUILD_PROD },
    },

    buildSourceMaps('source-map'),

    compileReact(
        {
            rule: {
                include: PATH_SRC,
                exclude: [
                    /node_modules/,
                    /__mocks__\/.*.jsx?$/,
                    /__tests__\/.*.jsx?$/,
                    /\.(spec|test)\.jsx?$/,
                ],
            },
            forkTsChecker: {
                typescript: {
                    configOverwrite: {
                        include: ['src/**/*'],
                        ...tsconfigBuildOverride,
                    },
                },
            },
        },
        'production',
    ),
])
