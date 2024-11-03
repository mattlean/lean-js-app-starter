const setupNodeExternals = require("ljas-webpack/setupNodeExternals");
const { compileReact } = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_BACKEND_SRC, PATH_ROOT, PATH_SRC } = require("../PATHS");

module.exports = merge([
  {
    entry: { server: `${PATH_BACKEND_SRC}/index.js` },

    output: {
      clean: true,
      filename: "[name].js",
    },

    target: "browserslist:backend",
  },

  compileReact({
    rule: {
      include: PATH_SRC,
      exclude: [
        /node_modules/,
        /__mocks__\/.*.jsx?$/,
        /__tests__\/.*.jsx?$/,
        /\.(spec|test)\.jsx?$/,
      ],
    },
    babelLoader: {
      cacheDirectory: true,
      configFile: `${PATH_ROOT}/babel.backend.js`,
    },
  }),

  setupNodeExternals(),
]);
