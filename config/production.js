const merge = require('webpack-merge')

const parts = require('./parts')
const PATHS = require('../PATHS')

module.exports = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js',
      path: `${PATHS.build}/production`
    }
  },

  parts.cleanPaths(['build/production']),

  parts.checkTypes(),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' }),

  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendor',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/
          }
        }
      },
      runtimeChunk: { name: 'manifest' }
    },

    recordsPath: `${PATHS.root}/records.json`
  }
])
