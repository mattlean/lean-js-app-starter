const merge = require('webpack-merge')

const developmentConfig = require('./development')
const parts = require('../common/parts')
const PATHS = require('../../PATHS')
const productionConfig = require('./production')

const commonConfig = merge([
  {
    entry: `${PATHS.back.src}/main.js`,

    resolve: { extensions: ['.js', '.jsx', '.json'] },

    target: 'node'
  },

  parts.setExternals(),

  parts.loadJS({ include: PATHS.src }),

  parts.setFreeVariable('__isBrowser__', false)
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
