/**
 * This is the webpack configuration that is only used when running in
 * development mode.
 */
const path = require('path')
const { merge } = require('webpack-merge')
const { genSourceMaps, setMode, setOutput } = require('ljas-webpack')

const MODE = 'development'

module.exports = merge([
  setMode(MODE),

  setOutput(MODE, path.resolve(__dirname, `../build/${MODE}`), 'node16.13'),

  genSourceMaps(MODE),
])
