const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Extract CSS into separate .css files.
 *
 * Peer dependencies:
 * - css-loader@^6.7.1
 * - mini-css-extract-plugin@^2.6.1
 */
module.exports = () => ({
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
})
