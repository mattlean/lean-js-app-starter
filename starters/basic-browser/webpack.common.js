const buildHtml = require('ljas-webpack/buildHtml')
const { compileJs } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_SRC } = require('./PATHS')

module.exports = merge([
    {
        entry: { app: `${PATH_SRC}/index.js` },

        output: { clean: true },
    },

    buildHtml({ title: 'ljas-basic-browser' }),

    compileJs({
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.js$/,
                /__tests__\/.*.js$/,
                /\.(spec|test)\.js$/,
            ],
        },
        babelLoaderCache: true,
    }),
])
