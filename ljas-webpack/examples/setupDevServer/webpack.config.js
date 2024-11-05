/**
 * See webpack.config.final.js to view the equivalent webpack config
 * in the conventional style.
 */
const buildHtml = require("ljas-webpack/buildHtml");
const { merge } = require("webpack-merge");
const { setupDevServer } = require("ljas-webpack");

module.exports = merge(buildHtml(), setupDevServer());
