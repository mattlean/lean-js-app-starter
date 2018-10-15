const merge = require('webpack-merge')

const parts = require('./parts')

module.exports = merge([
  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
