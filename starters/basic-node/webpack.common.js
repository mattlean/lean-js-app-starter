const setupNodeExternals = require("ljas-webpack/setupNodeExternals");
const { compileJs } = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_ROOT, PATH_SRC } = require("./PATHS");

module.exports = merge([
  {
    entry: { app: `${PATH_SRC}/index.js` },

    output: {
      clean: true,
      filename: "[name].js",
    },
  },

  compileJs({
    rule: {
      include: PATH_SRC,
      exclude: [
        /node_modules/,
        /__mocks__\/.*.js$/,
        /__tests__\/.*.js$/,
        /\.(spec|test)\.js$/,
      ],
    },
    babelLoader: {
      cacheDirectory: true,
      configFile: `${PATH_ROOT}/babel.config.js`,
    },
  }),

  setupNodeExternals(),
]);
