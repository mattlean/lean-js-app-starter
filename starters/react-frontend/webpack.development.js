const { merge } = require('webpack-merge')
const { setupDevServer } = require('ljas-webpack')

/**
 * Build the webpack development configuration.
 * @param {string} [mode] The webpack mode configuration option. (https://webpack.js.org/configuration/mode)
 */
module.exports = (mode) => merge([setupDevServer({ port: 8080 })])
