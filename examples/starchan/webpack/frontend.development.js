require('dotenv').config()

const buildHtml = require('ljas-webpack/buildHtml')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const webpack = require('webpack')
const {
    buildSourceMaps,
    injectCss,
    loadFonts,
    loadImages,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const templateParams = require('./templateParams')
const { PATH_FRONTEND_BUILD, PATH_FRONTEND_SRC } = require('../PATHS')

if (!process.env.PORT_DEV_SERVER) {
    throw new Error('🔴 webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        output: {
            clean: true,
            filename: '[name].js',
            path: `${PATH_FRONTEND_BUILD}/public`,
            publicPath: '/static',
        },

        // TODO: check if this is still needed
        plugins: [new webpack.EnvironmentPlugin({ DEV_SERVER: true })],
    },

    // Build HTML for webpack-dev-server
    buildHtml({
        filename: '../index.html',
        template: 'src/frontend/index.ejs',
        templateParameters: templateParams,
    }),

    buildSourceMaps('cheap-module-source-map'),

    injectCss({ rule: { include: PATH_FRONTEND_SRC } }),

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
            devMiddleware: {
                // Write files to disk so they can be served by Express as static files
                writeToDisk: true,
            },
            port: process.env.PORT_DEV_SERVER,
            static: {
                // Set webpack-dev-server's served directory to the /build/frontend
                // otherwise by default it will serve output.publicPath (/build/frontend/static)
                directory: PATH_FRONTEND_BUILD,
            },
        },
        rule: {
            include: PATH_FRONTEND_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
    }),
])
