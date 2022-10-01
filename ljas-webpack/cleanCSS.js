const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

/**
 * Remove unused CSS with PurgeCSS:
 * https://purgecss.com/plugins/webpack.html
 *
 * Peer dependency: purgecss-webpack-plugin@^5.0.0
 *
 * @param {Object} [options] Options for purgecss-webpack-plugin. (https://purgecss.com/plugins/webpack.html#options)
 */
module.exports = (options) => ({
  plugins: [new PurgeCSSPlugin(options)],
})
