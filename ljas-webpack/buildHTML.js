const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Build the HTML file with html-webpack-plugin:
 * https://webpack.js.org/plugins/html-webpack-plugin
 *
 * Peer dependency: html-webpack-plugin@^5.5.0
 *
 * @param {Object} [options] Options for html-webpack-plugin. (https://github.com/jantimon/html-webpack-plugin#options)
 */
module.exports = (options) => ({
  plugins: [new HtmlWebpackPlugin(options)],
})
