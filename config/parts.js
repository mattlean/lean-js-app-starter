const CleanWebpackPlugin = require('clean-webpack-plugin')
const FlowWebpackPlugin = require('flow-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

const PATHS = require('../PATHS')

// Run flow type checking
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

// Ignore node_modules dependencies in bundling
exports.setExternals = () => ({ externals: [ nodeExternals() ] })

// Load JavaScript through Babel
exports.loadJS = ({ exclude, include } = {}) => ({
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude,
        include,
        test: /\.js$/
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
