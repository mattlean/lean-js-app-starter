const glob = require('glob')
const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS')

module.exports = merge([
  {
    output: {
      filename: 'renderer.js',
      path: PATHS.build
    }
  },

  parts.cleanPaths(['build/production/webpack']),

  parts.checkTypes(),

  parts.loadHTML({
    template: `${PATHS.renderer.src}/index.html`,
    templateParameters: { csp: '<meta http-equiv="Content-Security-Policy" content="script-src \'self\'">' }
  }),

  parts.minJS(),

  parts.genSourceMaps({ type: 'source-map' })
])
