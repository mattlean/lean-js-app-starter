const merge = require('webpack-merge')

const parts = require('../common/parts')

module.exports = merge([
  parts.checkTypes(),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' }),
])
