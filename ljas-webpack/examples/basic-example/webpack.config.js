/**
 * See webpack.config.final.js to view the equivalent webpack config
 * in the conventional style.
 */
const buildCss = require('ljas-webpack/buildCss')
const buildHtml = require('ljas-webpack/buildHtml')
const compileTs = require('ljas-webpack/compileTs')
const path = require('path')
const { merge } = require('webpack-merge')
const { setupDevServer } = require('ljas-webpack')

module.exports = merge(
    {
        entry: './src/index.ts',
        mode: 'development',
        output: { filename: 'main.js', path: path.resolve(__dirname, 'build') },
    },
    buildCss(),
    buildHtml(),
    compileTs(),
    setupDevServer(),
)
