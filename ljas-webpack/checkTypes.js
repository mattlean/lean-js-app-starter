const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/**
 * Run TypeScript's type checker:
 * https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
 *
 * Note that this does not emit files since that is handled by compileTS().
 *
 * Peer dependency: fork-ts-checker-webpack-plugin@^7.2.13
 */
module.exports = () => ({
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references',
      },
    }),
  ],
})
