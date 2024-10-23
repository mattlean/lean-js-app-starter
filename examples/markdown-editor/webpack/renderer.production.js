const autoprefixer = require('autoprefixer')
const buildTransformedCss = require('ljas-webpack/buildTransformedCss')
const compileReactTs = require('ljas-webpack/compileReactTs')
const tailwindcss = require('tailwindcss')
const tailwindcssNesting = require('tailwindcss/nesting')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const {
    PATH_COMMON_SRC,
    PATH_RENDERER_BUILD_PROD,
    PATH_RENDERER_SRC,
    PATH_ROOT,
} = require('../PATHS')

module.exports = merge([
    {
        mode: 'production',

        output: {
            assetModuleFilename: '[name].[contenthash][ext][query]',
            chunkFilename: '[name].[contenthash].js',
            filename: '[name].[contenthash].js',
            path: PATH_RENDERER_BUILD_PROD,
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
        postcssLoader: {
            postcssOptions: {
                plugins: [autoprefixer, tailwindcssNesting, tailwindcss],
            },
        },
    }),

    buildSourceMaps('source-map'),

    compileReactTs({
        rule: {
            include: [PATH_COMMON_SRC, PATH_RENDERER_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.renderer.js`,
        },
        forkTsChecker: {
            typescript: { configFile: 'tsconfig.build.renderer.json' },
        },
    }),

    loadFonts({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),

    loadImages({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),
])
