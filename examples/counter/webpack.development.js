const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const { buildSourceMaps, injectSass } = require('ljas-webpack')
const { merge } = require('webpack-merge')
const { PATH_BUILD, PATH_SRC } = require('./PATHS')

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

    injectSass({ rule: { include: PATH_SRC } }),

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
