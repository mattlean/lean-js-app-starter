const nodeExternals = require('webpack-node-externals')

/**
 * Exclude node_modules from the build with webpack node modules externals:
 * https://github.com/liady/webpack-node-externals
 *
 * Tested with: webpack-node-externals@^3.0.0
 *
 * @param {Object} [options] Options for Webpack node modules externals. (https://github.com/liady/webpack-node-externals#configuration)
 * @return {Object} A webpack configuration object that sets up Webpack node modules externals.
 */
module.exports = (options) => ({
    externalsPresets: { node: true },
    externals: [nodeExternals(options)],
})
