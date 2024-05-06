const buildTransformedCss = require('ljas-webpack/buildTransformedCss')
const compileReactTs = require('ljas-webpack/compileReactTs')
const glob = require('glob')
const removeUnusedCss = require('ljas-webpack/removeUnusedCss')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const {
    PATH_FRONTEND_BUILD_PROD,
    PATH_COMMON_SRC,
    PATH_FRONTEND_SRC,
} = require('../PATHS')

module.exports = merge([
    {
        mode: 'production',

        output: {
            assetModuleFilename: '[name].[contenthash][ext][query]',
            chunkFilename: '[name].[contenthash].js',
            filename: '[name].[contenthash].js',
            path: PATH_FRONTEND_BUILD_PROD,
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

    buildTransformedCss({
        rule: { include: PATH_FRONTEND_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildSourceMaps('source-map'),

    compileReactTs(
        {
            rule: {
                include: [PATH_COMMON_SRC, PATH_FRONTEND_SRC],
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
                        include: [
                            'src/common/**/*',
                            'src/frontend/**/*',
                            'src/global.d.ts',
                        ],
                        ...tsconfigBuildOverride,
                    },
                },
            },
        },
        'production',
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
    }),
])
