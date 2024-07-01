const CopyPlugin = require('copy-webpack-plugin')
const { buildSourceMaps, watchIgnore } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD_DEV, PATH_SRC } = require('./PATHS')

module.exports = merge([
    {
        output: { path: PATH_BUILD_DEV },

        plugins: [
            // Copy static files from views directories to build
            new CopyPlugin({
                patterns: [
                    {
                        from: `${PATH_SRC}/views`,
                        to: `${PATH_BUILD_DEV}/views`,
                    },
                ],
            }),
        ],
    },

    buildSourceMaps('cheap-module-source-map'),

    watchIgnore(/node_modules/),
])
