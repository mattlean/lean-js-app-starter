const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const PATHS = { build: path.resolve(__dirname, 'build') }

module.exports = {
  devtool: 'source-map',

  entry: './src/main.js',

  externals: [ nodeExternals() ],

  output: {
    filename: 'server.js',
    path: PATHS.build
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/
      }
    ]
  },

  mode: process.env.NODE_ENV,

  plugins: [new CleanWebpackPlugin([PATHS.build])],

  target: 'node'
}
