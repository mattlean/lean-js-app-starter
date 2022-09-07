/**
 * This is the webpack configuration that is only used when running in
 * development mode.
 */
const { merge } = require('webpack-merge')
const {
  compileReact,
  genSourceMaps,
  setMode,
  setOutput,
  setupDevServer,
} = require('../ljas-webpack')

const mode = 'development'

module.exports = merge([
  setMode(mode),

  setOutput(mode),

  compileReact(),

  genSourceMaps(mode),

  setupDevServer(),
])
