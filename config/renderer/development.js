const merge = require('webpack-merge')

const parts = require('../parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js',
      path: PATHS.renderer.build
    }
  },

  parts.cleanPaths(['build/renderer']),

  parts.setupDevServer({
    host: process.env.HOST,
    port: process.env.PORT,
    historyApiFallback: true,
    hot: true
  }),

  parts.loadStyles(),

  parts.loadImgs(),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
