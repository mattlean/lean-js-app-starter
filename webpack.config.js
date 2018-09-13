const glob = require('glob')
const merge = require('webpack-merge')
const path = require('path')

const parts = require('./webpack.parts')

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src')
}

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.jsx`,
  },

  parts.loadJS({ include: PATHS.src }),

  parts.loadHTML({ template: `${PATHS.src}/index.html` })
])

const productionConfig = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js',
      path: PATHS.build,
      publicPath: '/'
    }
  },

  parts.cleanPath(PATHS.build),

  parts.minJS(),

  parts.minCSS({
    options: {
      discardComments: { removeAll: true },
      safe: true
    }
  }),

  parts.extractStyles(
    {
      use: [
        {
          loader: 'css-loader',
          options: { url: false }
        },
        'sass-loader',
        parts.autoprefix()
      ]
    }
  ),

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

    recordsPath: path.join(__dirname, 'records.json')
  }
])

const developmentConfig = merge([
  parts.checkTypes(),

  parts.setupDevServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),

  parts.loadStyles(),

  parts.loadImgs(),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
