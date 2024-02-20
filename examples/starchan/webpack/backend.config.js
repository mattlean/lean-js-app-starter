const compileReactTs = require('ljas-webpack/compileReactTs')
const CopyPlugin = require('copy-webpack-plugin')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BACKEND_BUILD, PATH_BACKEND_SRC, PATH_SRC } = require('../PATHS')

const buildConfig = (mode) =>
    merge([
        {
            entry: { server: './src/backend/index.ts' },

            output: {
                filename: '[name].js',
                path: PATH_BACKEND_BUILD,
            },

            plugins: [
                // Copy public & views directories in src to build
                new CopyPlugin({
                    patterns: [
                        {
                            from: `${PATH_BACKEND_SRC}/public`,
                            to: `${PATH_BACKEND_BUILD}/public`,
                            noErrorOnMissing: true,
                        },
                        {
                            from: `${PATH_BACKEND_SRC}/views`,
                            to: `${PATH_BACKEND_BUILD}/views`,
                            noErrorOnMissing: true,
                        },
                    ],
                }),
            ],

            target: 'node18.16',
        },

        compileReactTs(
            {
                rule: {
                    include: PATH_SRC,
                    exclude: [
                        /node_modules/,
                        /__mocks__\/.*.(j|t)sx?$/,
                        /__tests__\/.*.(j|t)sx?$/,
                        /\.(spec|test)\.(j|t)sx?$/,
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
            },
            mode
        ),

        setupNodeExternals({
            // TODO: remove this before going to prod
            additionalModuleDirs: ['../../node_modules'],
        }),
    ])

module.exports = (env, { mode }) => {
    const config = buildConfig(mode)

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
