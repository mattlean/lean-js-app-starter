/**
 * This is the webpack configuration that is only used when running in
 * production mode.
 */
const { merge } = require('webpack-merge')
const checkTypes = require('../ljas-webpack/checkTypes')
const lintTS = require('../ljas-webpack/lintTS')
const {
  compileReact,
  emitDeclarationFiles,
  genSourceMaps,
  setMode,
  setOutput,
} = require('../ljas-webpack')

const mode = 'production'

module.exports = merge([
  setMode(mode),

  setOutput(mode),

  lintTS(),

  checkTypes(),

  compileReact(),

  emitDeclarationFiles(),

  genSourceMaps(mode),
])
