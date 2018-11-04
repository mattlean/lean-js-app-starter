const merge = require('webpack-merge')

const developmentConfig = require('./development')
const parts = require('../common/parts')
const PATHS = require('../../PATHS').renderer
const productionConfig = require('./production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.jsx`,

    resolve: { extensions: ['.js', '.jsx', '.json'] },

    target: 'electron-renderer'
  },

  parts.loadJS({ include: PATHS.src })
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
