const compileReactTs = require('ljas-webpack/compileReactTs')
const path = require('path')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
    { mode: 'production' },

    buildSourceMaps('source-map'),

    compileReactTs(
        {
            rule: {
                include: path.resolve(__dirname, '../src/frontend'),
                exclude: [
                    /node_modules/,
                    /__mocks__\/.*.(j|t)sx?$/,
                    /__tests__\/.*.(j|t)sx?$/,
                    /\.(spec|test)\.(j|t)sx?$/,
                ],
            },
        },
        'production'
    ),
])
