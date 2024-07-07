const { buildSourceMaps, compileJs } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([buildSourceMaps('source-map'), compileJs()])
