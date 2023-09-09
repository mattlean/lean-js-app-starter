const compileReactTs = require('ljas-webpack/compileReactTs')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const path = require('path')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const buildConfig = (mode) =>
    merge([
        {
            entry: './src/backend/index.ts',

            output: {
                filename: 'server.js',
                path: path.resolve(__dirname, '../build/backend'),
            },

            plugins: [
                // Copy static files from public directory in src to build
                new FileManagerPlugin({
                    events: {
                        onEnd: {
                            copy: [
                                {
                                    source: path.resolve(
                                        __dirname,
                                        '../src/backend/public'
                                    ),
                                    destination: path.resolve(
                                        __dirname,
                                        '../build/backend/public'
                                    ),
                                    options: {
                                        overwrite: true,
                                        preserveTimestamps: true,
                                    },
                                },
                                {
                                    source: path.resolve(
                                        __dirname,
                                        '../src/backend/views'
                                    ),
                                    destination: path.resolve(
                                        __dirname,
                                        '../build/backend/views'
                                    ),
                                    options: {
                                        overwrite: true,
                                        preserveTimestamps: true,
                                    },
                                },
                            ],
                        },
                    },
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
