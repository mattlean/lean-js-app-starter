const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')

module.exports = merge([
    { entry: { app: './src/index.jsx' } },

    buildHtml({ title: 'ljas-react-frontend' }),
])
