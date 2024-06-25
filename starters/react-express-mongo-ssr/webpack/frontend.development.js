const buildCss = require('ljas-webpack/buildCss')
const buildHtml = require('ljas-webpack/buildHtml')
const setupReactFastRefreshServer = require('ljas-webpack/setupReactFastRefreshServer')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const templateParameters = require('./templateParameters')
const {
    PATH_COMMON_SRC,
    PATH_FRONTEND_BUILD_DEV,
    PATH_FRONTEND_SRC,
    PATH_ROOT,
} = require('../PATHS')

if (
    (process.env.E2E && !process.env.PORT_WEBPACK_DEV_SERVER_E2E) ||
    !process.env.PORT_WEBPACK_DEV_SERVER
) {
    throw new Error('webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        output: {
            filename: '[name].js',
            path: PATH_FRONTEND_BUILD_DEV,
        },

        target: 'browserslist:frontend-development',
    },

    buildCss({
        rule: { include: PATH_FRONTEND_SRC },
        miniCssExtractPlugin: { filename: '[name].css' },
    }),

    // Build HTML for webpack-dev-server
    buildHtml({
        filename: 'index.html',
        template: 'src/frontend/devServer.ejs',
        templateParameters,
    }),

    buildSourceMaps('cheap-module-source-map'),

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

    setupReactFastRefreshServer({
        devServer: {
            devMiddleware: {
                // Write files to disk so they can be served by Express as static files
                writeToDisk: true,
            },
            historyApiFallback: true,
            port: process.env.E2E
                ? process.env.PORT_WEBPACK_DEV_SERVER_E2E
                : process.env.PORT_WEBPACK_DEV_SERVER,
            watchFiles: ['src/frontend/**/*.ejs'],
        },
        rule: {
            include: [PATH_COMMON_SRC, PATH_FRONTEND_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.jsx?$/,
                /__tests__\/.*.jsx?$/,
                /\.(spec|test)\.jsx?$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.frontend.js`,
        },
    }),
])
