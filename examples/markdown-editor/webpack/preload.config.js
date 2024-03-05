const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_PRELOAD_BUILD, PATH_PRELOAD_SRC } = require('../PATHS')

const config = merge([
    {
        entry: { preload: `${PATH_PRELOAD_SRC}/index.ts` },

        output: {
            clean: true,
            filename: '[name].js',
            path: PATH_PRELOAD_BUILD,
        },

        target: 'electron-preload',
    },

    compileTs({
        rule: {
            include: PATH_PRELOAD_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/preload/**/*', 'src/global.d.ts'],
                    exclude: [
                        'src/**/__mocks__',
                        'src/**/__tests__',
                        'src/**/*.spec.js',
                        'src/**/*.spec.jsx',
                        'src/**/*.spec.ts',
                        'src/**/*.spec.tsx',
                        'src/**/*.test.js',
                        'src/**/*.test.jsx',
                        'src/**/*.test.ts',
                        'src/**/*.test.tsx',
                    ],
                },
            },
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
