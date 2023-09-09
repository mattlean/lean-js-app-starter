const path = require('path')
const { buildSourceMaps, compileReact } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
    { mode: 'production' },

    buildSourceMaps('source-map'),

    compileReact(
        {
            rule: {
                include: path.resolve(__dirname, 'src'),
                exclude: [
                    /node_modules/,
                    /__mocks__\/.*.jsx?$/,
                    /__tests__\/.*.jsx?$/,
                    /\.(spec|test)\.jsx?$/,
                ],
            },
        },
        'production'
    ),
])
