const merge = require('webpack-merge')

const parts = require('../parts')

module.exports = merge([
  parts.setupDevServer({
    host: process.env.HOST,
    port: process.env.PORT,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9001/api',
        pathRewrite: { '^/api': '' }
      }
    }
  }),

  parts.loadStyles(),

  parts.loadImgs(),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
