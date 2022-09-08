/**
 * This is the webpack configuration that is only used when running in
 * production mode.
 */
const path = require('path')
const { merge } = require('webpack-merge')
const checkTypes = require('../ljas-webpack/checkTypes')
const lintTS = require('../ljas-webpack/lintTS')
const {
  emitDeclarationFiles,
  genSourceMaps,
  setMode,
  setOutput,
} = require('../ljas-webpack')

const srcPath = path.resolve(__dirname, '../src')

const mode = 'production'

module.exports = merge([
  setMode(mode),

  setOutput(mode),

  lintTS(),

  checkTypes(),

  emitDeclarationFiles(srcPath),

  genSourceMaps(mode),
])
