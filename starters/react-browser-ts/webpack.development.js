require('dotenv').config()

const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const {
    buildSourceMaps,
    injectCss,
    loadFonts,
    loadImages,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_BUILD_DEV, PATH_SRC } = require('./PATHS')

if (!process.env.PORT) {
    throw new Error('🔴 webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        output: {
            filename: '[name].js',
            path: PATH_BUILD_DEV,
        },
    },

    buildSourceMaps('cheap-module-source-map'),

    injectCss({ rule: { include: PATH_SRC } }),

    loadFonts({
        rule: {
            generator: { filename: 'assets/[name][ext][query]' },
            // Export the asset as a data URI if it's below the maxSize threshold,
            // otherwise emit it as a separate file and export the URL
            parser: { dataUrlCondition: { maxSize: 50000 } },
            type: 'asset',
        },
    }),

    loadImages({
        rule: {
            generator: { filename: 'assets/[name][ext][query]' },
            // Export the asset as a data URI if it's below the maxSize threshold,
            // otherwise emit it as a separate file and export the URL
            parser: { dataUrlCondition: { maxSize: 15000 } },
            type: 'asset',
        },
    }),

    setupReactFastRefreshServerTs({
        devServer: {
            historyApiFallback: true,
            port: process.env.PORT,
            watchFiles: ['src/**/*.ejs'],
        },
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
            typescript: { configOverwrite: tsconfigBuildOverride },
        },
    }),
])
