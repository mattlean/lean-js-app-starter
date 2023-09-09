const path = require('path')
const setupReactFastRefreshServer = require('ljas-webpack/setupReactFastRefreshServer')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
    { mode: 'development' },

    buildSourceMaps('cheap-module-source-map'),

    setupReactFastRefreshServer({
        devServer: { port: 8080 },
        rule: {
            include: path.resolve(__dirname, 'src'),
            exclude: [
                /node_modules/,
                /__mocks__\/.*.jsx?$/,
                /__tests__\/.*.jsx?$/,
                /\.(spec|test)\.jsx?$/,
            ],
        },
    }),
])
