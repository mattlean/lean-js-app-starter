const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Extract CSS into separate .css files.
 *
 * Peer dependencies:
 * - css-loader@^6.7.1
 * - mini-css-extract-plugin@^2.6.1
 *
 * @param {Object} [options] The options object that controls the output of this function.
 * @param {Object} [options.cssLoader] Options for css-loader. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Array|Function|Object|RegExp|string} [options.exclude=/node_modules/] webpack exclude rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {Array|Function|Object|RegExp|string} [options.include] webpack include rule. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.miniCssExtractLoader] Loader options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options)
 * @param {Object} [options.miniCssExtractPlugin] Plugin options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#plugin-options)
 * @param {boolean} [options.sideEffects] webpack sideEffects rule. (https://webpack.js.org/configuration/module/#rulesideeffects)
 */
module.exports = (options) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: options?.exclude,
          include: options?.include,
          sideEffects: options?.sideEffects,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: options?.miniCssExtractLoader,
            },
            { loader: 'css-loader', options: options?.cssLoader },
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(options?.miniCssExtractPlugin)],
  }
}
