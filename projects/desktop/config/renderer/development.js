const merge = require('webpack-merge')

const parts = require('../common/parts')
const PATHS = require('../../PATHS').renderer

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080

module.exports = merge([
  {
    output: {
      filename: 'renderer.js',
      path: PATHS.build
    }
  },

  parts.cleanPaths(['build/development/renderer']),

  parts.setupDevServer({
    host: HOST,
    port: PORT,
    hot: true
  }),

  parts.loadHTML({
    template: `${PATHS.src}/index.html`,
    templateParameters: { csp: `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval' http://${HOST}:${PORT} ws://${HOST}:${PORT} blob: data:">` }
  }),

  parts.loadStyles(),

  parts.loadImgs(),

  parts.loadFonts(),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
