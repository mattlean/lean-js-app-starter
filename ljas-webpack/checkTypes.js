const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/**
 * Run TypeScript's type checker:
 * https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
 *
 * Note that this does not emit files since that is handled by compileTS().
 *
 * Peer dependency: fork-ts-checker-webpack-plugin@^7.2.13
 *
 * @param {Object} [options] Options for fork-ts-checker-webpack-plugin. This will override the default options set for fork-ts-checker-webpack-plugin when defined. (https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options)
 */
module.exports = (
  options
  // options = {
  //   typescript: {
  //     mode: 'write-references',
  //   },
  // }
) => ({
  plugins: [new ForkTsCheckerWebpackPlugin(options)],
})
