const compileReactTs = require('ljas-webpack/compileReactTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_BACKEND_SRC, PATH_ROOT, PATH_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: { server: `${PATH_BACKEND_SRC}/index.ts` },

        output: {
            clean: true,
            filename: '[name].js',
        },

        target: 'browserslist:backend',
    },

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

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])
