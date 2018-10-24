const glob = require('glob')
const merge = require('webpack-merge')

const parts = require('../parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js',
      path: `${PATHS.build}/main/renderer`
    }
  },

  parts.cleanPaths(['build/production/main']),

  parts.checkTypes(),

  parts.minJS(),

  parts.minCSS({
    options: {
      discardComments: { removeAll: true },
      safe: true
    }
  }),

  parts.extractStyles({ use: ['css-loader', 'sass-loader', parts.autoprefix()] }),

  parts.purifyCSS({ paths: glob.sync(`${PATHS.renderer.src}/**/*.{js,jsx}`, { nodir: true }) }),

  parts.loadImgs({
    options: {
      limit: 15000,
      name: '/assets/imgs/[name].[ext]'
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
    }
  }
])
