const merge = require('webpack-merge')

const developmentConfig = require('./development')
const parts = require('../common/parts')
const PATHS = require('../../PATHS').client
const productionConfig = require('./production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.jsx`,

    resolve: { extensions: ['.js', '.jsx', '.json'] }
  },

  parts.loadJS({ include: PATHS.src }),

  parts.loadHTML({ template: `${PATHS.src}/index.html` }),

  parts.setFreeVariable('__isBrowser__', true)
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
