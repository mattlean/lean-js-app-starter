const merge = require('webpack-merge')

const developmentConfig = require('./development')
const parts = require('../common/parts')
const PATHS = require('../../PATHS').main
const productionConfig = require('./production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.js`,

    node: { __dirname: false },

    resolve: { extensions: ['.js', '.json'] },

    target: 'electron-main'
  },

  parts.loadJS({ include: PATHS.src })
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
