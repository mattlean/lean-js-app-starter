const buildHtml = require('ljas-webpack/buildHtml')
const path = require('path')
const { compileReact } = require('ljas-webpack')
const { merge } = require('webpack-merge')

/**
 * Build the webpack common configuration.
 * @param {string} [mode] The webpack mode configuration option. (https://webpack.js.org/configuration/mode)
 */
module.exports = (mode) =>
    merge([
        {
            entry: './src/index.jsx',

            output: {
                clean: true,
                filename: 'app.js',
                path: path.resolve(__dirname, 'build'),
            },
        },

        compileReact(
            {
                rule: {
                    include: path.resolve(__dirname, 'src'),
                    exclude: [
                        /node_modules/,
                        /__mocks__\/.*.jsx?$/,
                        /__tests__\/.*.jsx?$/,
                        /\.(spec|test)\.jsx?$/,
                    ],
                },
            },
            mode
        ),

        buildHtml({ title: 'ljas-react-frontend' }),
    ])
