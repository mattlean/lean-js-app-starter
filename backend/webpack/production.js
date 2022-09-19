/**
 * This is the webpack configuration that is only used when running in
 * production mode.
 */
const path = require('path')
const { merge } = require('webpack-merge')
const { genSourceMaps, setMode, setOutput } = require('ljas-webpack')

const mode = 'production'

module.exports = merge([
  setMode(mode),
  setOutput(mode, path.resolve(__dirname, `../build/${mode}`), 'node16.13'),
  genSourceMaps(mode),
])
