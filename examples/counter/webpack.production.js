const buildPrefixedSass = require('ljas-webpack/buildPrefixedSass')
const compileReactTs = require('ljas-webpack/compileReactTs')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD, PATH_SRC } = require('./PATHS')

module.exports = merge([
    {
        mode: 'production',

        output: {
            assetModuleFilename: '[name].[contenthash][ext][query]',
            chunkFilename: '[name].[contenthash].js',
            clean: true,
            filename: '[name].[contenthash].js',
            path: PATH_BUILD,
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'initial',
                    },
                },
            },
        },
    },

    buildPrefixedSass({
        rule: { include: PATH_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildSourceMaps('source-map'),

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
        'production'
    ),
])
