const buildTransformedCss = require('ljas-webpack/buildTransformedCss')
const compileReactTs = require('ljas-webpack/compileReactTs')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_COMMON_SRC, PATH_RENDERER_SRC } = require('../PATHS')

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

    buildTransformedCss({
        rule: { include: PATH_RENDERER_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildTransformedCss({
        rule: { include: PATH_RENDERER_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildSourceMaps('source-map'),

    compileReactTs(
        {
            rule: {
                include: [PATH_COMMON_SRC, PATH_RENDERER_SRC],
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
                        include: ['src/global.d.ts', 'src/renderer/**/*'],
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
        'production',
    ),

    loadFonts({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),

    loadImages({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),
])
