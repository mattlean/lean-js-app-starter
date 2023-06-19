const buildHtml = require('ljas-webpack/buildHtml')
const path = require('path')
const compileReactTs = require('ljas-webpack/compileReactTs')
const { merge } = require('webpack-merge')

/**
 * Build the webpack common configuration.
 * @param {string} [mode] The webpack mode configuration option. (https://webpack.js.org/configuration/mode)
 */
module.exports = (mode) =>
    merge([
        {
            entry: './src/index.tsx',

            output: {
                clean: true,
                filename: 'app.js',
                path: path.resolve(__dirname, 'build'),
            },
        },

        compileReactTs(
            {
                rule: {
                    include: path.resolve(__dirname, 'src'),
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

        buildHtml({ title: 'ljas-react-frontend-ts' }),
    ])
