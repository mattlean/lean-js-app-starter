const glob = require('glob')
const merge = require('webpack-merge')

const parts = require('../parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'renderer.js',
      path: `${PATHS.build}`
    }
  },

  parts.cleanPaths(['build/production/webpack']),

  parts.checkTypes(),

  parts.loadHTML({
    template: `${PATHS.renderer.src}/index.html`,
    templateParameters: { csp: '<meta http-equiv="Content-Security-Policy" content="script-src \'self\'">' }
  }),

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

  parts.genSourceMaps({ type: 'source-map' })
])
