const { buildSourceMaps, compileReact } = require('ljas-webpack')
const { merge } = require('webpack-merge')
const { PATH_SRC } = require('./PATHS')

module.exports = merge([
    { mode: 'production' },

    buildSourceMaps('source-map'),

    compileReact(
        {
            rule: {
                include: PATH_SRC,
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
