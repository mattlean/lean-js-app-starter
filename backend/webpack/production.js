/**
 * This is the webpack configuration that is only used when running in
 * production mode.
 */
const checkTypes = require('ljas-webpack/checkTypes')
const lintTS = require('ljas-webpack/lintTS')
const path = require('path')
const { merge } = require('webpack-merge')
const {
  emitDeclarationFiles,
  genSourceMaps,
  setMode,
  setOutput,
} = require('ljas-webpack')

const MODE = 'production'

module.exports = merge([
  setMode(MODE),

  setOutput(MODE, path.resolve(__dirname, `../build/${MODE}`), 'node16.13'),

  lintTS('src'),

  checkTypes(),

  emitDeclarationFiles(path.resolve(__dirname, '../src')),

  genSourceMaps(MODE),
])
