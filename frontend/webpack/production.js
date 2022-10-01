/**
 * This is the webpack configuration that is only used when running in
 * production mode.
 */
const checkTypes = require('ljas-webpack/checkTypes')
const cleanCSS = require('ljas-webpack/cleanCSS')
const extractCSS = require('ljas-webpack/extractCSS')
const glob = require('glob')
const lintTS = require('ljas-webpack/lintTS')
const path = require('path')
const { genSourceMaps, setMode, setOutput } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const MODE = 'production'

module.exports = merge([
  setMode(MODE),

  setOutput(MODE, path.resolve(__dirname, `../build/${MODE}`)),

  extractCSS(),

  cleanCSS({
    paths: glob.sync(path.join(__dirname, '../src/*.+(js|json|jsx|ts|tsx)'), {
      nodir: true,
    }),
  }),

  lintTS({ eslintPlugin: { files: 'src' }, supportReact: true }),

  checkTypes(),

  genSourceMaps(MODE),
])
