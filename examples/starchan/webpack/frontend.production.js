const buildPrefixedCss = require('ljas-webpack/buildPrefixedCss')
const compileReactTs = require('ljas-webpack/compileReactTs')
const glob = require('glob')
const removeUnusedCss = require('ljas-webpack/removeUnusedCss')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_FRONTEND_BUILD, PATH_FRONTEND_SRC } = require('../PATHS')

module.exports = merge([
    {
        mode: 'production',

        output: {
            assetModuleFilename: '[name].[contenthash][ext][query]',
            chunkFilename: '[name].[contenthash].js',
            clean: true,
            filename: '[name].[contenthash].js',
            path: `${PATH_FRONTEND_BUILD}/public`,
            publicPath: '/static',
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
        rule: { include: PATH_FRONTEND_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildPrefixedCss({
        rule: { include: PATH_FRONTEND_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildSourceMaps('source-map'),

    compileReactTs(
        {
            rule: {
                include: PATH_FRONTEND_SRC,
                exclude: [
                    /node_modules/,
                    /__mocks__\/.*.(j|t)sx?$/,
                    /__tests__\/.*.(j|t)sx?$/,
                    /\.(spec|test)\.(j|t)sx?$/,
                ],
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

    removeUnusedCss({
        paths: glob.sync(`${PATH_FRONTEND_SRC}/**/*.[jt]s?(x)`, {
            nodir: true,
        }),
        safelist: ['body'],
    }),
])
