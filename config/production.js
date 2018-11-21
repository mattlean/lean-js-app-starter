const glob = require('glob')
const merge = require('webpack-merge')

const parts = require('./parts')
const PATHS = require('../PATHS')

if(!process.env.SERVER) {
  throw new Error('SERVER must be explicitly defined when running in production mode')
}

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
      limit: 15000,
      name: '/assets/imgs/[name].[hash:4].[ext]'
    }
  }),

  parts.genSourceMaps({ type: 'source-map' }),

  parts.setFreeVariable('__server__', process.env.SERVER),

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
