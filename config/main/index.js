const merge = require('webpack-merge')

const developmentConfig = require('./development')
const parts = require('../parts')
const PATHS = require('../../PATHS').main
const productionConfig = require('./production')

const commonConfig = merge([
  {
    entry: `${PATHS.src}/main.js`,

    output: {
      filename: 'main.js',
      path: PATHS.build
    },

    resolve: { extensions: ['.js', '.json'] },

    target: 'electron-main',

    node: { __dirname: false }
  },

  parts.loadJS({ include: PATHS.src }),

  parts.loadHTML({ template: `${PATHS.src}/index.html` }),

  parts.cleanPaths(['build/main'])
])

module.exports = mode => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
