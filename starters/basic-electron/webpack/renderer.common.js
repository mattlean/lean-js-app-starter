const buildHtml = require("ljas-webpack/buildHtml");
const { compileJs } = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_COMMON_SRC, PATH_RENDERER_SRC, PATH_ROOT } = require("../PATHS");

module.exports = merge([
  {
    entry: { app: `${PATH_RENDERER_SRC}/index.js` },

    output: { clean: true },
  },

  buildHtml({
    title: "ljas-basic-electron",
    template: "src/renderer/index.ejs",
  }),

  compileJs({
    rule: {
      include: [PATH_COMMON_SRC, PATH_RENDERER_SRC],
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
]);
