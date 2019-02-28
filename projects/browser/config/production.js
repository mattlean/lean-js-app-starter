const glob = require('glob')
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

  parts.minCSS({
    options: {
      discardComments: { removeAll: true },
      safe: true
    }
  }),

  parts.extractStyles({
    filename: '[name].[contenthash:4].css',
    use: ['css-loader', 'sass-loader', parts.autoprefix()]
  }),

  parts.purifyCSS({ paths: glob.sync(`${PATHS.src}/**/*.{js,jsx}`, { nodir: true }) }),

  parts.loadImgs({
    options: {
      name: `${PATHS.assets}/imgs/[name].[hash:4].[ext]`
    },
    type: 'file'
  }),

  parts.loadFonts({
    options: {
      name: `${PATHS.assets}/fonts/[name].[hash:4].[ext]`
    },
    type: 'file'
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
