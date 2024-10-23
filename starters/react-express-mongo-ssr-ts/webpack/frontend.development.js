const buildCss = require('ljas-webpack/buildCss')
const buildHtml = require('ljas-webpack/buildHtml')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const {
    buildSourceMaps,
    ignoreWatch,
    loadFonts,
    loadImages,
} = require('ljas-webpack')
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

    ignoreWatch(/node_modules/),

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

    setupReactFastRefreshServerTs({
        rule: {
            include: [PATH_COMMON_SRC, PATH_FRONTEND_SRC],
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.frontend.js`,
        },
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
        forkTsChecker: {
            typescript: { configFile: 'tsconfig.build.frontend.json' },
        },
    }),
])
