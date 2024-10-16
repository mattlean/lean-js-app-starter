const CopyPlugin = require('copy-webpack-plugin')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD_PROD, PATH_SRC } = require('./PATHS')

module.exports = merge([
    {
        output: { path: PATH_BUILD_PROD },

        plugins: [
            // Copy static files from views directories to build
            new CopyPlugin({
                patterns: [
                    {
                        from: `${PATH_SRC}/views`,
                        to: `${PATH_BUILD_PROD}/views`,
                    },
                ],
            }),
        ],
    },

    buildSourceMaps('source-map'),
])
