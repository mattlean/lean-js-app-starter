const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'source-map',

  entry: './src/main.js',

  externals: [ nodeExternals() ],

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
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

  target: 'node'
}
