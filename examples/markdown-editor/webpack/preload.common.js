const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const { PATH_COMMON_SRC, PATH_PRELOAD_SRC } = require('../PATHS')

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
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/global.d.ts', 'src/preload/**/*'],
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
