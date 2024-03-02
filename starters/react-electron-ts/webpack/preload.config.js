const compileTs = require('ljas-webpack/compileTs')
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
                    include: ['src/preload/**/*'],
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
