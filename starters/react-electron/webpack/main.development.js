const { buildSourceMaps, ignoreWatch } = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_MAIN_BUILD_DEV } = require("../PATHS");

module.exports = merge([
  { output: { path: PATH_MAIN_BUILD_DEV } },

  buildSourceMaps("cheap-module-source-map"),

  ignoreWatch(/node_modules/),
]);
