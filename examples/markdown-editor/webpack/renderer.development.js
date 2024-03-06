require('dotenv').config()

const tailwindcss = require('tailwindcss')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_RENDERER_BUILD, PATH_RENDERER_SRC } = require('../PATHS')
const buildTransformedCss = require('ljas-webpack/buildTransformedCss')

if (!process.env.PORT_DEV_SERVER) {
    throw new Error('🔴 webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        output: {
            clean: true,
            filename: '[name].js',
            path: PATH_RENDERER_BUILD,
        },
    },

    buildSourceMaps('cheap-module-source-map'),

    buildTransformedCss({
        rule: { include: PATH_RENDERER_SRC },
        postcssLoader: {
            postcssOptions: {
                plugins: [require('autoprefixer'), tailwindcss],
            },
        },
    }),

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
        devServer: {
            devMiddleware: {
                writeToDisk: true,
            },
            historyApiFallback: true,
            port: process.env.PORT_DEV_SERVER,
            watchFiles: ['src/renderer/**/*.ejs'],
        },
        rule: {
            include: PATH_RENDERER_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)sx?$/,
                /__tests__\/.*.(j|t)sx?$/,
                /\.(spec|test)\.(j|t)sx?$/,
            ],
        },
        forkTsChecker: {
            typescript: {
                configOverwrite: {
                    include: ['src/renderer/**/*', 'src/global.d.ts'],
                },
            },
        },
    }),
])
