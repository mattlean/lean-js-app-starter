const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_COMMON_SRC, PATH_MAIN_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: { main: `${PATH_MAIN_SRC}/index.ts` },

        output: {
            clean: true,
            filename: '[name].js',
        },

        target: 'electron-main',
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
        babelLoaderCache: true,
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/main/**/*', 'src/global.d.ts'],
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