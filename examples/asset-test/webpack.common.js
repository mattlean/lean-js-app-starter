const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')

module.exports = merge([
    { entry: { app: './src/index.tsx' } },

    buildHtml({ title: 'ljas-asset-test' }),
])