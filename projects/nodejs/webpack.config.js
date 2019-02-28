const merge = require('webpack-merge')

const developmentConfig = require('./config/development')
const parts = require('./config/parts')
const PATHS = require('./PATHS')
const productionConfig = require('./config/production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.js`,

    resolve: { extensions: ['.js', '.json'] },

    target: 'node'
  },

  parts.setExternals(),

  parts.loadJS({ include: PATHS.src })
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
