const buildPrefixedSass = require('ljas-webpack/buildPrefixedSass')
const compileReactTs = require('ljas-webpack/compileReactTs')
// const glob = require('glob')
// const removeUnusedCss = require('ljas-webpack/removeUnusedCss')
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
        },
        'production'
    ),

    // removeUnusedCss({
    //     paths: glob.sync(`${PATH_SRC}/**/*.[jt]s?(x)`, { nodir: true }),
    //     safelist: [
    //         'body',
    //     ],
    // }),
])
