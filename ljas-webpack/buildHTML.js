const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Build the index HTML file with html-webpack-plugin:
 * https://webpack.js.org/plugins/html-webpack-plugin
 *
 * Peer dependency: html-webpack-plugin@^5.5.0
 *
 * @param {string} title HTML document title (https://github.com/jantimon/html-webpack-plugin#options)
 * @param {string} template webpack relative or absolute path to the template (https://github.com/jantimon/html-webpack-plugin#options)
 */
module.exports = (title, template) => ({
  plugins: [
    new HtmlWebpackPlugin({
      title,
      template,
    }),
  ],
})
