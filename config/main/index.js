const merge = require('webpack-merge')

const developmentConfig = require('./development')
const parts = require('../common/parts')
const PATHS = require('../../PATHS').main
const productionConfig = require('./production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.js`,

    resolve: { extensions: ['.js', '.json'] },

    externals: [
      function(context, request, callback) {
        if (request.match(/devtron/)) {
          return callback(null, 'commonjs ' + request)
        }
        callback()
      }
    ],

    target: 'electron-main',

    node: { __dirname: false }
  },

  parts.loadJS({ include: PATHS.src })
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
