const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'server.js',
      path: `${PATHS.back.build}/production`
    }
  },

  parts.cleanPaths(['build/back/production']),

  parts.checkTypes(),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' }),
])
