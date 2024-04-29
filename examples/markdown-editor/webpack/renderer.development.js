require('dotenv').config()

const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')
const tailwindcssNesting = require('tailwindcss/nesting')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const { buildSourceMaps, loadFonts, loadImages } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const {
    PATH_COMMON_SRC,
    PATH_RENDERER_BUILD_DEV,
    PATH_RENDERER_SRC,
} = require('../PATHS')

const injectTransformedCss = require('ljas-webpack/injectTransformedCss')

if (!process.env.PORT_DEV_SERVER) {
    throw new Error('🔴 webpack-dev-server port was not set')
}

module.exports = merge([
    {
        mode: 'development',

        output: { path: PATH_RENDERER_BUILD_DEV },

        optimization: {
            runtimeChunk: 'single',
        },
    },

    buildSourceMaps('cheap-module-source-map'),

    injectTransformedCss({
        rule: { include: PATH_RENDERER_SRC },
        postcssLoader: {
            postcssOptions: {
                plugins: [autoprefixer, tailwindcssNesting, tailwindcss],
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
            include: [PATH_COMMON_SRC, PATH_RENDERER_SRC],
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
                    include: ['src/global.d.ts', 'src/renderer/**/*'],
                    exclude: [
                        'src/**/__mocks__',
                        'src/**/__tests__',
                        'src/**/*.spec.js',
                        'src/**/*.spec.jsx',
                        'src/**/*.spec.ts',
                        'src/**/*.spec.tsx',
                        'src/**/*.test.js',
                        'src/**/*.test.jsx',
                        'src/**/*.test.ts',
                        'src/**/*.test.tsx',
                    ],
                },
            },
        },
    }),
])
