/**
 * This is the webpack configuration that is used for all modes.
 */
const { merge } = require('webpack-merge')

module.exports = merge([
  {
    entry: './src/main.ts',
  },
])
