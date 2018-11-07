const merge = require('webpack-merge')

const parts = require('../common/parts')

module.exports = merge([
  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
