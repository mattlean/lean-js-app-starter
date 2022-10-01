/**
 * This is the webpack configuration that is only used when running in
 * development mode.
 */
const path = require('path')
const {
  genSourceMaps,
  inlineCSS,
  setMode,
  setOutput,
  setupDevServer,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const MODE = 'development'

module.exports = merge([
  setMode(MODE),

  setOutput(MODE, path.resolve(__dirname, `../build/${MODE}`)),

  inlineCSS(),

  genSourceMaps(MODE),

  setupDevServer('./build/development'),
])
