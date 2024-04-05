const compileTs = require('ljas-webpack/compileTs')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_COMMON_SRC, PATH_MAIN_BUILD, PATH_MAIN_SRC } = require('../PATHS')

const config = merge([
    {
        entry: { main: `${PATH_MAIN_SRC}/index.ts` },

        output: {
            clean: true,
            filename: '[name].js',
            path: PATH_MAIN_BUILD,
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
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/global.d.ts', 'src/main/**/*'],
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
