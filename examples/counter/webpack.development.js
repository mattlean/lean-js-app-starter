const path = require('path')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const { buildSourceMaps, injectSass } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
    { mode: 'development' },

    buildSourceMaps('cheap-module-source-map'),

    injectSass({ rule: { include: path.resolve(__dirname, 'src') } }),

    setupReactFastRefreshServerTs({
        devServer: { port: 8080 },
        rule: {
            include: path.resolve(__dirname, 'src'),
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
    }),
])
