const CleanWebpackPlugin = require('clean-webpack-plugin')
const FlowWebpackPlugin = require('flow-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const PATHS = require('../PATHS')

// Run Flow type checking
exports.checkTypes = () => ({
  plugins: [new FlowWebpackPlugin()]
})

// Clean paths
exports.cleanPaths = paths => ({
  plugins: [new CleanWebpackPlugin(
    paths,
    { root: PATHS.root }
  )]
})

// Create source maps
exports.genSourceMaps = ({ type }) => ({ devtool: type })

// Load JavaScript through Babel
exports.loadJS = ({ exclude, include } = {}) => ({
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude,
        include,
        test: /\.jsx?$/
      }
    ]
  }
})

// Minify JavaScript
exports.minJS = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin( { sourceMap: true} )]
  }
})

// Ignore node_modules dependencies in bundling
exports.setExternals = () => ({ externals: [ nodeExternals() ] })

// Set free variable
exports.setFreeVariable = (key, val) => {
  const env = {}
  env[key] = JSON.stringify(val)

  return { plugins: [new webpack.DefinePlugin(env)] }
}
