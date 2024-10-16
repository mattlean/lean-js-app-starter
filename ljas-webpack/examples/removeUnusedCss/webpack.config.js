/**
 * See webpack.config.final.js to view the equivalent webpack config
 * in the conventional style.
 */
const buildCss = require('ljas-webpack/buildCss')
const glob = require('glob')
const removeUnusedCss = require('ljas-webpack/removeUnusedCss')
const { merge } = require('webpack-merge')

module.exports = merge(
    buildCss(),
    removeUnusedCss({
        paths: glob.sync('./src/**/*', { nodir: true }),
    }),
)
