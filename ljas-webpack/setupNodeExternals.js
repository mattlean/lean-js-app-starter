const nodeExternals = require('webpack-node-externals')

/**
 * Prevent bundling node_modules dependencies with webpack-node-externals:
 * https://github.com/liady/webpack-node-externals
 *
 * Peer dependency: webpack-node-externals@^3.0.0
 *
 * @param {Object} [options] Options for webpack-node-externals. (https://github.com/liady/webpack-node-externals#configuration)
 */
module.exports = (options) => ({
  externalsPresets: { node: true },
  externals: [nodeExternals(options)],
})
