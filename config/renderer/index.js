const merge = require('webpack-merge')

const developmentConfig = require('./development')
const parts = require('../parts')
const PATHS = require('../../PATHS').renderer
const productionConfig = require('./production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.jsx`,

    resolve: { extensions: ['.js', '.jsx', '.json'] },

    target: 'electron-renderer',

    node: { __dirname: false }
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