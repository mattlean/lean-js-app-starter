const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

/**
 * Remove unused CSS with purgecss-webpack-plugin:
 * https://purgecss.com/plugins/webpack.html
 *
 * Tested with: purgecss-webpack-plugin@^5.0.0
 *
 * @param {Object} options Options for purgecss-webpack-plugin. (https://purgecss.com/plugins/webpack.html#options)
 * @returns {Object} A webpack configuration object that sets up purgecss-webpack-plugin.
 */
const removeUnusedCss = (options) => ({
  plugins: [new PurgeCSSPlugin(options)],
});

module.exports = removeUnusedCss;
