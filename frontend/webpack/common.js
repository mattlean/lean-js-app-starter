/**
 * This is the webpack configuration that is used for all modes.
 */
const buildHTML = require('ljas-webpack/buildHTML')
const path = require('path')
const { compileTS } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
  {
    entry: './src/main.tsx',
  },

  buildHTML({
    title: 'Lean JavaScript Application Starter',
    template: 'src/index.html',
  }),

  compileTS({ include: path.resolve(__dirname, '../src'), supportReact: true }),
])
