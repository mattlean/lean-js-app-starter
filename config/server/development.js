const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'server.js',
      path: `${PATHS.server.build}/development`
    }
  },

  parts.cleanPaths(['build/server/development']),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
