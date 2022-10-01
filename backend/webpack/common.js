/**
 * This is the webpack configuration that is used for all modes.
 */
const path = require('path')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { compileTS } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
  {
    entry: './src/main.ts',
  },

  compileTS({ include: path.resolve(__dirname, '../src') }),

  setupNodeExternals(),
])
