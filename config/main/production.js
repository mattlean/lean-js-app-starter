const merge = require('webpack-merge')

const parts = require('../parts')

module.exports = merge([
  parts.checkTypes(),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' })
])
