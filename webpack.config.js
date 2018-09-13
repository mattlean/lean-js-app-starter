const merge = require('webpack-merge')

const developmentConfig = require('./config/development')
const parts = require('./config/parts')
const PATHS = require('./PATHS')
const productionConfig = require('./config/production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.jsx`,
  },

  parts.loadJS({ include: PATHS.src }),

  parts.loadHTML({ template: `${PATHS.src}/index.html` })
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
