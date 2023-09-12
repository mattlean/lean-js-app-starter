const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')
const { PATH_SRC } = require('./PATHS')

module.exports = merge([
    { mode: 'development' },

    buildSourceMaps('cheap-module-source-map'),

    setupReactFastRefreshServerTs({
        devServer: { port: 8080 },
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
    }),
])
