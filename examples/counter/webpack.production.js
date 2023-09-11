const buildPrefixedSass = require('ljas-webpack/buildPrefixedSass')
const compileReactTs = require('ljas-webpack/compileReactTs')
const glob = require('glob')
const path = require('path')
const removeUnusedCss = require('ljas-webpack/removeUnusedCss')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const PATH_SRC = path.resolve(__dirname, 'src')

module.exports = merge([
    { mode: 'production' },

    buildPrefixedSass({ rule: { include: PATH_SRC } }),

    buildSourceMaps('source-map'),

    compileReactTs(
        {
            rule: {
                include: PATH_SRC,
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

    removeUnusedCss({
        paths: glob.sync(`${PATH_SRC}/**/*.[jt]s?(x)`, { nodir: true }),
        safelist: ['foo'],
    }),
])
