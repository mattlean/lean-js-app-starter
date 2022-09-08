const { merge } = require('webpack-merge')
const commonConfig = require('./webpack/common')

/**
 * Generate the webpack configuration based on the mode.
 * @param {('development'|'none'|'production')} mode webpack mode (https://webpack.js.org/configuration/mode)
 * @return {Object} webpack configuration
 */
const genConfig = (mode) => {
  switch (mode) {
    case 'development':
    case 'none':
      if (mode === 'none') {
        console.warn(
          "The 'mode' option was set to 'none' which is not supported, so we set it to 'development'."
        )
      }
      return merge(commonConfig, require('./webpack/development'))

    default:
      if (!mode) {
        console.warn(
          "The 'mode' option was not set, so we set it to 'production'."
        )
      }

      return merge(commonConfig, require('./webpack/production'))
  }
}

module.exports = (env, argv) => genConfig(argv.mode)
