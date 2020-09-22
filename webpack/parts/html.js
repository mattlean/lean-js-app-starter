/**
 * Lean JavaScript Application Starter
 * Webpack Configuration Parts
 *
 * HTML
 * v0.2.0
 *
 * https://github.com/mattlean/lean-js-app-starter
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Load HTML file as string with html-loader
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.options] html-loader options
 * @param {RegExp} [FnParams.test=/\.(ejs|html)$/i] Rule test value
 * @return {Object} Module config for html-loader
 */
exports.loadHTMLAsString = ({ options, test } = {}) => {
  if (!test) test = /\.(ejs|html)$/i;

  return {
    module: {
      rules: [
        {
          test,
          loader: "html-loader",
          options,
        },
      ],
    },
  };
};

/**
 * Setup HTML with html-webpack-plugin
 *
 * @param {Object} options html-webpack-plugin options
 * @return {Object} Plugin config for html-webpack-plugin
 */
exports.setupHTML = (options) => ({
  plugins: [new HtmlWebpackPlugin(options)],
});
