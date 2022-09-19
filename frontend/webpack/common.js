/**
 * This is the webpack configuration that is used for all modes.
 */
const buildHTML = require('ljas-webpack/buildHTML')
const path = require('path')
const { compileReact } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
  {
    entry: './src/main.tsx',
  },

  buildHTML('Lean JavaScript Application Starter', 'src/index.html'),

  compileReact(path.resolve(__dirname, '../src')),
])
