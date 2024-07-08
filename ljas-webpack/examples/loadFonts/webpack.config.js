/**
 * See webpack.config.final.js to view the equivalent webpack config
 * in the conventional style.
 */
const buildCss = require('ljas-webpack/buildCss')
const { loadFonts } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([buildCss(), loadFonts()])
