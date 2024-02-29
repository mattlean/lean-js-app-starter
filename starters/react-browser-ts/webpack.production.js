const buildPrefixedCss = require('ljas-webpack/buildPrefixedCss')
const compileReactTs = require('ljas-webpack/compileReactTs')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_SRC } = require('./PATHS')

module.exports = merge([
    {
        mode: 'production',

        output: {
            assetModuleFilename: '[name].[contenthash][ext][query]',
            chunkFilename: '[name].[contenthash].js',
            clean: true,
            filename: '[name].[contenthash].js',
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

    buildPrefixedCss({
        rule: { include: PATH_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildPrefixedCss({
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
                typescript: { configOverwrite: { include: ['src/**/*'] } },
            },
        },
        'production'
    ),

    loadFonts({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),

    loadImages({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),
])
