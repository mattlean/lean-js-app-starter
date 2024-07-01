const {
    buildSourceMaps,
    injectCss,
    loadFonts,
    loadImages,
    setupDevServer,
    watchIgnore,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD_DEV, PATH_SRC } = require('./PATHS')

if (!process.env.PORT_WEBPACK_DEV_SERVER) {
    throw new Error('🔴 webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        output: {
            filename: '[name].js',
            path: PATH_BUILD_DEV,
        },

        target: 'browserslist:development',
    },

    buildSourceMaps('cheap-module-source-map'),

    injectCss({ rule: { include: PATH_SRC } }),

    loadFonts({
        rule: {
            generator: { filename: 'assets/[name][ext][query]' },
            // Export the asset as a data URI if it's below the maxSize threshold,
            // otherwise emit it as a separate file and export the URL
            parser: { dataUrlCondition: { maxSize: 50000 } },
            type: 'asset',
        },
    }),

    loadImages({
        rule: {
            generator: { filename: 'assets/[name][ext][query]' },
            // Export the asset as a data URI if it's below the maxSize threshold,
            // otherwise emit it as a separate file and export the URL
            parser: { dataUrlCondition: { maxSize: 15000 } },
            type: 'asset',
        },
    }),

    setupDevServer({
        historyApiFallback: true,
        port: process.env.PORT_WEBPACK_DEV_SERVER,
        watchFiles: ['src/**/*.ejs'],
    }),

    watchIgnore(/node_modules/),
])
