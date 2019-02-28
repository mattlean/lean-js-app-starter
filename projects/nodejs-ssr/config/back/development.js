const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'app.js',
      path: `${PATHS.back.build}/development`
    }
  },

  parts.cleanPaths(['build/back/development']),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
