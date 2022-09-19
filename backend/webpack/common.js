/**
 * This is the webpack configuration that is used for all modes.
 */
const path = require('path')
const { compileTS } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
  {
    entry: './src/main.ts',
  },

  compileTS(path.resolve(__dirname, '../src')),
])
