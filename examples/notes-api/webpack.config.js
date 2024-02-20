const compileTs = require('ljas-webpack/compileTs')
const CopyPlugin = require('copy-webpack-plugin')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD, PATH_SRC } = require('./PATHS')

const config = merge([
    {
        entry: { server: './src/index.ts' },

        output: {
            clean: true,
            filename: '[name].js',
            path: PATH_BUILD,
        },

        target: 'node18.16',

        plugins: [
            // Copy static files from views directories in src to build
            new CopyPlugin({
                patterns: [
                    {
                        from: `${PATH_SRC}/views`,
                        to: `${PATH_BUILD}/views`,
                    },
                ],
            }),
        ],
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
            typescript: {
                configOverwrite: {
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
            const configProd = merge(config, buildSourceMaps('source-map'))
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return configProd
        }

        default: {
            const configDev = merge(
                config,
                buildSourceMaps('cheap-module-source-map')
            )
            console.log('DEBUG CONFIG', configDev, JSON.stringify(configDev))
            return configDev
        }
    }
}
