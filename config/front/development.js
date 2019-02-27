const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS').front

module.exports = merge([
  {
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js',
      path: `${PATHS.build}/development`
    }
  },

  parts.cleanPaths(['build/front/development']),

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

  parts.loadFonts(),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' }),

  parts.genAssetList({ format: 'object', key: 'name' })
])
