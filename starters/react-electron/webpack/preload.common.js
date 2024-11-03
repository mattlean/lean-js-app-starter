const setupNodeExternals = require("ljas-webpack/setupNodeExternals");
const { compileJs } = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_COMMON_SRC, PATH_PRELOAD_SRC, PATH_ROOT } = require("../PATHS");

module.exports = merge([
  {
    entry: { preload: `${PATH_PRELOAD_SRC}/index.js` },

    output: {
      clean: true,
      filename: "[name].js",
    },

    target: "electron29.1-preload",
  },

  compileJs({
    rule: {
      include: [PATH_COMMON_SRC, PATH_PRELOAD_SRC],
      exclude: [
        /node_modules/,
        /__mocks__\/.*.js$/,
        /__tests__\/.*.js$/,
        /\.(spec|test)\.js$/,
      ],
    },
    babelLoader: {
      cacheDirectory: true,
      configFile: `${PATH_ROOT}/babel.preload.js`,
    },
  }),

  setupNodeExternals(),
]);
