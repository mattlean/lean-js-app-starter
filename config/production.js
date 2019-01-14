const merge = require('webpack-merge')

const parts = require('./parts')
const PATHS = require('../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'server.js',
      path: `${PATHS.build}/production`
    },
  },

  parts.cleanPaths(['build/production']),

  parts.checkTypes(),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' })
])
