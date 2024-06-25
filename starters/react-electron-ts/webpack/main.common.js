const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const { PATH_COMMON_SRC, PATH_MAIN_SRC, PATH_ROOT } = require('../PATHS')

module.exports = merge([
    {
        entry: { main: `${PATH_MAIN_SRC}/index.ts` },

        output: {
            clean: true,
            filename: '[name].js',
        },

        target: 'electron29.1-main',
    },

    compileTs({
        rule: {
            include: [PATH_COMMON_SRC, PATH_MAIN_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.main.js`,
        },
        forkTsChecker: {
            typescript: { configFile: 'tsconfig.build.main.json' },
        },
    }),

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])
