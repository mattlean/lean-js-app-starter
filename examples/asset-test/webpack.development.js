const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const {
    buildSourceMaps,
    injectCss,
    loadFonts,
    loadImages,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BUILD_DEV, PATH_ROOT, PATH_SRC } = require('./PATHS')

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
            parser: { dataUrlCondition: { maxSize: 15000 } },
            // Export the asset as a data URI if it's below the maxSize threshold,
            // otherwise emit it as a separate file and export the URL
            type: 'asset',
        },
    }),

    setupReactFastRefreshServerTs({
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.config.js`,
        },
        devServer: {
            historyApiFallback: true,
            port: process.env.PORT_WEBPACK_DEV_SERVER,
            watchFiles: ['src/**/*.ejs'],
        },
        forkTsChecker: {
            typescript: { configFile: 'tsconfig.build.json' },
        },
    }),
])
