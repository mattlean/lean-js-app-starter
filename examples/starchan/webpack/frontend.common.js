const buildHtml = require('ljas-webpack/buildHtml')
const compileReactTs = require('ljas-webpack/compileReactTs')
const path = require('path')
const { merge } = require('webpack-merge')

const templateParams = require('./templateParams')

/**
 * Build the webpack common configuration.
 * @param {string} [mode] The webpack mode configuration option. (https://webpack.js.org/configuration/mode)
 */
module.exports = (mode) =>
    merge([
        {
            entry: './src/frontend/index.tsx',

            output: {
                clean: true,
                filename: 'app.js',
                path: path.resolve(__dirname, '../build/frontend/public'),
                publicPath: '/static',
            },
        },

        compileReactTs(
            {
                rule: {
                    include: path.resolve(__dirname, '../src/frontend'),
                    exclude: [
                        /node_modules/,
                        /__mocks__\/.*.(j|t)sx?$/,
                        /__tests__\/.*.(j|t)sx?$/,
                        /\.(spec|test)\.(j|t)sx?$/,
                    ],
                },
            },
            mode
        ),

        // Generate EJS templates with injected assets for Express views
        buildHtml({
            filename: '../generated-views/index.ejs',
            // template: 'src/frontend/index.ejs?raw',
            template: '!!raw-loader!src/frontend/index.ejs',
            // template: 'src/frontend/index.ejs',
            templateParameters: templateParams,
        }),
    ])
