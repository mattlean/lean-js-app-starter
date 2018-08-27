const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
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

  target: 'node'
}
