require('dotenv').config()

const buildHtml = require('ljas-webpack/buildHtml')
const path = require('path')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const webpack = require('webpack')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const templateParams = require('./templateParams')

if (!process.env.PORT_DEV_SERVER) {
    throw new Error('🔴 webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        plugins: [
            new webpack.EnvironmentPlugin({
                DEV_SERVER: true,
            }),
        ],
    },

    // Build HTML for webpack-dev-server
    buildHtml({
        filename: '../index.html',
        template: 'src/frontend/index.ejs',
        templateParameters: templateParams,
    }),

    buildSourceMaps('cheap-module-source-map'),

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
                directory: path.join(__dirname, '../build/frontend'),
            },
        },
        rule: {
            include: path.resolve(__dirname, '../src/frontend'),
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
    }),
])
