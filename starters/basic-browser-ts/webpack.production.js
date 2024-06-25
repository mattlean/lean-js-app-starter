const buildTransformedCss = require('ljas-webpack/buildTransformedCss')
const compileTs = require('ljas-webpack/compileTs')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD_PROD, PATH_ROOT, PATH_SRC } = require('./PATHS')

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

        target: 'browserslist:production',
    },

    buildTransformedCss({
        rule: { include: PATH_SRC },
        miniCssExtractPlugin: { filename: '[name].[contenthash].css' },
    }),

    buildSourceMaps('source-map'),

    compileTs({
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.config.js`,
        },
        forkTsChecker: {
            typescript: { configFile: 'tsconfig.build.json' },
        },
    }),

    loadFonts({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),

    loadImages({
        rule: { generator: { filename: 'assets/[name].[hash][ext][query]' } },
    }),
])
