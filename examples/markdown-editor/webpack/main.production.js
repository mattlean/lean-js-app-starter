const CopyPlugin = require('copy-webpack-plugin')
const { buildSourceMaps } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const {
    PATH_BUILD_PROD,
    PATH_MAIN_BUILD_PROD,
    PATH_MAIN_SRC,
} = require('../PATHS')

module.exports = merge([
    {
        output: { path: PATH_MAIN_BUILD_PROD },

        plugins: [
            // Copy icons to build
            new CopyPlugin({
                patterns: [
                    {
                        from: `${PATH_MAIN_SRC}/icons/src/logo.png`,
                        to: `${PATH_MAIN_BUILD_PROD}/logo.png`,
                        noErrorOnMissing: true,
                    },
                    {
                        from: `${PATH_MAIN_SRC}/icons/build`,
                        to: PATH_BUILD_PROD,
                        noErrorOnMissing: true,
                    },
                ],
            }),
        ],
    },

    buildSourceMaps('source-map'),
])
