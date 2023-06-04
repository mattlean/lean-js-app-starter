const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Build the HTML file with HTML Webpack Plugin:
 * https://webpack.js.org/plugins/html-webpack-plugin
 *
 * Tested with: html-webpack-plugin@^5.5.1
 *
 * @param {Object} [options] Options for HTML Webpack Plugin. (https://github.com/jantimon/html-webpack-plugin#options)
 * @return {Object} A webpack configuration object that sets up HTML Webpack Plugin.
 */
module.exports = (options) => ({
    plugins: [new HtmlWebpackPlugin(options)],
})