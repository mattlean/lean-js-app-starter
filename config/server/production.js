const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'server.js',
      path: `${PATHS.server.build}/production`
    }
  },

  parts.cleanPaths(['build/server/production']),

  parts.checkTypes(),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' }),
])
