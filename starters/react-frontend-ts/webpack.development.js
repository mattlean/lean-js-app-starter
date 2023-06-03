const { merge } = require('webpack-merge')
const { setupDevServer } = require('ljas-webpack')

module.exports = merge([
    { mode: 'development' },

    setupDevServer({ port: 8080 }),
])
