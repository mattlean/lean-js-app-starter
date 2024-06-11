const buildTransformedCss = require('ljas-webpack/buildTransformedCss')
const {
    buildSourceMaps,
    compileReact,
    loadFonts,
    loadImages,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD_PROD, PATH_SRC } = require('./PATHS')

module.exports = merge([
    {
        mode: 'production',

        output: {
            assetModuleFilename: '[name].[contenthash][ext][query]',
            chunkFilename: '[name].[contenthash].js',
            filename: '[name].[contenthash].js',
            path: PATH_BUILD_PROD,
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
        rule: { include: PATH_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildSourceMaps('source-map'),

    compileReact({
        babelLoaderPresets: [
            ['@babel/env', { modules: false }],
            '@babel/preset-flow',
            '@babel/preset-react',
        ],
        devServer: {
            historyApiFallback: true,
            port: process.env.PORT_WEBPACK_DEV_SERVER,
            watchFiles: ['src/**/*.ejs'],
        },
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.jsx?$/,
                /__tests__\/.*.jsx?$/,
                /\.(spec|test)\.jsx?$/,
            ],
        },
    }),

    loadFonts({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),

    loadImages({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),
])
