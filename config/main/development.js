const merge = require('webpack-merge')

const parts = require('../parts')
const PATHS = require('../../PATHS').main

module.exports = merge([
  {
    output: {
      filename: 'main.js',
      path: PATHS.build
    }
  },

  parts.cleanPaths(['build/development/main']),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
