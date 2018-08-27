const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/main.js',

  externals: [ nodeExternals() ],

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },

  target: 'node'
}
