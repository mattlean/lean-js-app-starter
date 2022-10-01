const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Extract CSS into separate .css files.
 *
 * For more information:
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/plugins/mini-css-extract-plugin
 *
 * Peer dependencies:
 * - css-loader@^6.7.1
 * - mini-css-extract-plugin@^2.6.1
 *
 * Additional peer dependencies if enableAutoprefixer option is enabled:
 * - autoprefixer@^10.4.12
 * - postcss-loader@^7.0.1
 *
 * @param {Object} [options] The options object that controls the output of this function.
 * @param {Object} [options.autoprefixer] Options for Autoprefixer. (https://github.com/postcss/autoprefixer#options)
 * @param {Object} [options.cssLoader] Options for css-loader. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {boolean} [options.enableAutoprefixer] Enable Autoprefixer with postcss-loader.
 * @param {Array|Function|Object|RegExp|string} [options.exclude=/node_modules/] webpack exclude rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {Array|Function|Object|RegExp|string} [options.include] webpack include rule. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.miniCssExtractLoader] Loader options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options)
 * @param {Object} [options.miniCssExtractPlugin] Plugin options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#plugin-options)
 * @param {Object} [options.postcssLoader] Options for postcss-loader. Note that the plugins option cannot be overwritten. (https://webpack.js.org/loaders/postcss-loader/#options)
 * @param {boolean} [options.sideEffects] webpack sideEffects rule. (https://webpack.js.org/configuration/module/#rulesideeffects)
 */
module.exports = (options) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: options?.miniCssExtractLoader,
    },
    { loader: 'css-loader', options: options?.cssLoader },
  ]
  if (options?.enableAutoprefixer) {
    loaders.push({
      loader: 'postcss-loader',
      options: {
        ...options?.postcssLoader,
        postcssOptions: {
          ...options?.postcssLoader?.postcssOptions,
          plugins: [require('autoprefixer')(options?.autoprefixer)],
        },
      },
    })
  }

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: options?.exclude,
          include: options?.include,
          sideEffects: options?.sideEffects,
          use: loaders,
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(options?.miniCssExtractPlugin)],
  }
}
