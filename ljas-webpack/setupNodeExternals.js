const nodeExternals = require('webpack-node-externals')

/**
 * Prevent bundling node_modules dependencies with webpack-node-externals:
 * https://github.com/liady/webpack-node-externals
 *
 * Peer dependency: webpack-node-externals@^3.0.0
 */
module.exports = () => ({
  externalsPresets: { node: true },
  externals: [nodeExternals()],
})
