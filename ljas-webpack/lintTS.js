const ESLintPlugin = require('eslint-webpack-plugin')
const { REACT_EXTENSIONS, VANILLA_EXTENSIONS } = require('./consts')

/**
 * Lint TypeScript code with ESLint:
 * https://webpack.js.org/plugins/eslint-webpack-plugin
 *
 * Peer dependency: eslint-webpack-plugin@^3.2.0
 *
 * @param {Object} [options] The options object that controls the output of this function.
 * @param {Object} [options.esLintPlugin] Options for eslint-webpack-plugin. Note that when the extensions option is defined, it will override the default value set for it. (https://webpack.js.org/plugins/eslint-webpack-plugin/#options)
 */
module.exports = (options) => {
  const esLintPluginOptions = options?.esLintPlugin || {}
  if (!esLintPluginOptions.extensions) {
    if (options?.supportReact) {
      esLintPluginOptions.extensions = REACT_EXTENSIONS
    } else {
      esLintPluginOptions.extensions = VANILLA_EXTENSIONS
    }
  }

  return {
    plugins: [new ESLintPlugin(esLintPluginOptions)],
  }
}
