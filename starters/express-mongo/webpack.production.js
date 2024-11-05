const { buildSourceMaps } = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_BUILD_PROD } = require("./PATHS");

module.exports = merge([
  {
    output: { path: PATH_BUILD_PROD },
  },

  buildSourceMaps("source-map"),
]);
