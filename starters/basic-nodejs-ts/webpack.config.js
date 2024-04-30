const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_BUILD, PATH_SRC } = require('./PATHS')

const config = merge([
    {
        entry: { app: './src/index.ts' },

        output: {
            clean: true,
            filename: '[name].js',
            path: PATH_BUILD,
        },

        target: 'node',
    },

    compileTs({
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
        forkTsChecker: {
            typescript: { configOverwrite: tsconfigBuildOverride },
        },
    }),

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            return merge(config, buildSourceMaps('source-map'))
        }

        default: {
            return merge(config, buildSourceMaps('cheap-module-source-map'))
        }
    }
}
