/**
 * This is the webpack configuration that is only used when running in
 * production mode.
 */
const checkTypes = require('ljas-webpack/checkTypes')
const lintTS = require('ljas-webpack/lintTS')
const path = require('path')
const {
  emitDeclarationFiles,
  genSourceMaps,
  setMode,
  setOutput,
} = require('ljas-webpack')
const { merge } = require('webpack-merge')

const mode = 'production'

module.exports = merge([
  setMode(mode),

  setOutput(mode, path.resolve(__dirname, `../build/${mode}`)),

  lintTS('src'),

  checkTypes(),

  emitDeclarationFiles(path.resolve(__dirname, '../src')),

  genSourceMaps(mode),
])
