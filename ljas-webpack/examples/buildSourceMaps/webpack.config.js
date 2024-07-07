/**
 * See webpack.config.final.js to view the equivalent webpack config
 * in the conventional style.
 */
const { buildSourceMaps } = require('ljas-webpack')

module.exports = buildSourceMaps('source-map')
