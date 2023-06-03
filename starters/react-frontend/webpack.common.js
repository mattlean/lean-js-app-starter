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
            entry: './src/main.jsx',

            output: {
                clean: true,
                filename: 'app.js',
                path: path.resolve(__dirname, 'build'),
            },
        },

        compileReact({ include: path.resolve(__dirname, 'src') }, mode),

        buildHtml({ title: 'ljas-react-frontend' }),
    ])
