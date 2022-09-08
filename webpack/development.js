/**
 * This is the webpack configuration that is only used when running in
 * development mode.
 */
const { merge } = require('webpack-merge')
const {
  genSourceMaps,
  setMode,
  setOutput,
  setupDevServer,
} = require('../ljas-webpack')

const mode = 'development'

module.exports = merge([
  setMode(mode),

  setOutput(mode),

  genSourceMaps(mode),

  setupDevServer(),
])
