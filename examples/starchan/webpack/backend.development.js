const CopyPlugin = require('copy-webpack-plugin')
const { buildSourceMaps, ignoreWatch } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BACKEND_BUILD_DEV, PATH_BACKEND_SRC } = require('../PATHS')

module.exports = merge([
    {
        output: { path: PATH_BACKEND_BUILD_DEV },

        plugins: [
            // Copy static files from public & views directories to build
            new CopyPlugin({
                patterns: [
                    {
                        from: `${PATH_BACKEND_SRC}/public`,
                        to: `${PATH_BACKEND_BUILD_DEV}/public`,
                        noErrorOnMissing: true,
                    },
                    {
                        from: `${PATH_BACKEND_SRC}/views/*.ejs`,
                        to: `${PATH_BACKEND_BUILD_DEV}/views/[name][ext]`,
                        noErrorOnMissing: true,
                    },
                ],
            }),
        ],
    },

    buildSourceMaps('cheap-module-source-map'),

    ignoreWatch(/node_modules/),
])
