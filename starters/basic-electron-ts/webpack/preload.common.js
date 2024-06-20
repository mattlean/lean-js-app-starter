const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_COMMON_SRC, PATH_PRELOAD_SRC, PATH_ROOT } = require('../PATHS')

module.exports = merge([
    {
        entry: { preload: `${PATH_PRELOAD_SRC}/index.ts` },

        output: {
            clean: true,
            filename: '[name].js',
        },

        target: 'electron-preload',
    },

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
            configFile: `${PATH_ROOT}/babel.config.js`,
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

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])
