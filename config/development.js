const merge = require('webpack-merge')

const parts = require('./parts')
const PATHS = require('../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'server.js',
      path: `${PATHS.build}/development`
    },
  },

  parts.cleanPaths(['build/development']),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
