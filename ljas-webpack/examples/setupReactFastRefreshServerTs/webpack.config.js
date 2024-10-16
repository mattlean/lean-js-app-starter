/**
 * See webpack.config.final.js to view the equivalent webpack config
 * in the conventional style.
 */
const buildHtml = require('ljas-webpack/buildHtml')
const setupReactFastRefreshServerTs = require('ljas-webpack/setupReactFastRefreshServerTs')
const { merge } = require('webpack-merge')

module.exports = merge(buildHtml(), setupReactFastRefreshServerTs())
