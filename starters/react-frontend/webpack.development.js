const { merge } = require('webpack-merge')
const { setupDevServer } = require('ljas-webpack')

module.exports = merge([setupDevServer({ port: 8080 })])
