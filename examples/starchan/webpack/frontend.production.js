const compileReactTs = require('ljas-webpack/compileReactTs')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')
const { PATH_FRONTEND_SRC } = require('../PATHS')

module.exports = merge([
    { mode: 'production' },

    buildSourceMaps('source-map'),

    compileReactTs(
        {
            rule: {
                include: PATH_FRONTEND_SRC,
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
