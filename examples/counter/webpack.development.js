require('dotenv').config()

const injectTransformedSass = require('ljas-webpack/injectTransformedSass')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const tsconfigBuildOverride = require('./tsconfigBuildOverride')
const { PATH_BUILD, PATH_SRC } = require('./PATHS')

if (!process.env.PORT) {
    throw new Error('🔴 webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        output: {
            clean: true,
            filename: '[name].js',
            path: PATH_BUILD,
        },
    },

    buildSourceMaps('cheap-module-source-map'),

    injectTransformedSass({ rule: { include: PATH_SRC } }),

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
