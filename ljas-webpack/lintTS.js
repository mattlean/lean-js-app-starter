const ESLintPlugin = require('eslint-webpack-plugin')

/**
 * Lint JavaScript code with ESLint:
 * https://webpack.js.org/plugins/eslint-webpack-plugin
 *
 * Peer dependency: eslint-webpack-plugin@^3.2.0
 *
 * @param {string|string[]} files Specify directories, files, or globs (https://webpack.js.org/plugins/eslint-webpack-plugin/#files)
 */
module.exports = (files) => ({
  plugins: [new ESLintPlugin({ extensions: 'ts', files })],
})
