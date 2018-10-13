const glob = require('glob')
const merge = require('webpack-merge')

const parts = require('./parts')
const PATHS = require('../PATHS')

module.exports = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js',
      path: PATHS.build
    }
  },

  parts.cleanPaths(['build']),

  parts.checkTypes(),

  parts.minJS(),

  parts.minCSS({
    options: {
      discardComments: { removeAll: true },
      safe: true
    }
  }),

  parts.extractStyles({ use: ['css-loader', 'sass-loader', parts.autoprefix()] }),

  parts.purifyCSS({ paths: glob.sync(`${PATHS.src}/**/*.{js,jsx}`, { nodir: true }) }),

  parts.loadImgs({
    options: {
      limit: 15000,
      name: '/assets/imgs/[name].[hash:4].[ext]'
    }
  }),

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
