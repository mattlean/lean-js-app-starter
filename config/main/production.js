const merge = require('webpack-merge')

const parts = require('../parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'main.js',
      path: `${PATHS.build}`
    }
  },

  parts.checkTypes(),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' })
])
