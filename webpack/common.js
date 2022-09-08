/**
 * This is the webpack configuration that is used for all modes.
 */
const path = require('path')
const { merge } = require('webpack-merge')
const buildHTML = require('../ljas-webpack/buildHTML')
const { compileReact } = require('../ljas-webpack')

const srcPath = path.resolve(__dirname, '../src')

module.exports = merge([
  {
    entry: './src/main.tsx',
  },

  buildHTML(),

  compileReact(srcPath),
])
