/**
 * This is the webpack configuration that is used for all modes.
 */
const { merge } = require('webpack-merge')
const buildHTML = require('../ljas-webpack/buildHTML')

module.exports = merge([
  {
    entry: './src/main.tsx',
  },

  buildHTML(),
])
