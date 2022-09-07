const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Build the index HTML file with html-webpack-plugin:
 * https://webpack.js.org/plugins/html-webpack-plugin
 *
 * Peer dependency: html-webpack-plugin@^5.5.0
 */
module.exports = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Lean JavaScript Application Starter',
      template: 'src/index.html',
    }),
  ],
})
