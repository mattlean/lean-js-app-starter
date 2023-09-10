const compileReactTs = require('ljas-webpack/compileReactTs')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const OUTPUT_PATH = path.resolve(__dirname, '../build/backend')

const buildConfig = (mode) =>
    merge([
        {
            entry: './src/backend/index.ts',

            output: {
                filename: 'server.js',
                path: OUTPUT_PATH,
            },

            plugins: [
                // Copy static files from public & views directories in src to build
                new CopyPlugin({
                    patterns: [
                        {
                            from: path.resolve(
                                __dirname,
                                '../src/backend/public'
                            ),
                            to: `${OUTPUT_PATH}/public`,
                        },
                        {
                            from: path.resolve(
                                __dirname,
                                '../src/backend/views'
                            ),
                            to: `${OUTPUT_PATH}/views`,
                        },
                    ],
                }),
            ],

            target: 'node18.16',
        },

        compileReactTs(
            {
                rule: {
                    include: path.resolve(__dirname, '../src'),
                    exclude: [
                        /node_modules/,
                        /__mocks__\/.*.(j|t)sx?$/,
                        /__tests__\/.*.(j|t)sx?$/,
                        /\.(spec|test)\.(j|t)sx?$/,
                    ],
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
