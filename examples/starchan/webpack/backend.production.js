const CopyPlugin = require("copy-webpack-plugin");
const { buildSourceMaps } = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_BACKEND_BUILD_PROD, PATH_BACKEND_SRC } = require("../PATHS");

module.exports = merge([
  {
    output: { path: PATH_BACKEND_BUILD_PROD },

    plugins: [
      // Copy static files from public & views directories to build
      new CopyPlugin({
        patterns: [
          {
            from: `${PATH_BACKEND_SRC}/public`,
            to: `${PATH_BACKEND_BUILD_PROD}/public`,
            noErrorOnMissing: true,
          },
          {
            from: `${PATH_BACKEND_SRC}/views/*.ejs`,
            to: `${PATH_BACKEND_BUILD_PROD}/views/[name][ext]`,
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
  },

  buildSourceMaps("source-map"),
]);
