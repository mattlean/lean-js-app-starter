/**
 * This is the webpack configuration that is only used when running in
 * production mode.
 */
const checkTypes = require('ljas-webpack/checkTypes')
const extractCSS = require('ljas-webpack/extractCSS')
const lintTS = require('ljas-webpack/lintTS')
const path = require('path')
const { genSourceMaps, setMode, setOutput } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const MODE = 'production'

module.exports = merge([
  setMode(MODE),

  setOutput(MODE, path.resolve(__dirname, `../build/${MODE}`)),

  extractCSS(),

  lintTS({ eslintPlugin: { files: 'src' }, supportReact: true }),

  checkTypes(),

  genSourceMaps(MODE),
])
