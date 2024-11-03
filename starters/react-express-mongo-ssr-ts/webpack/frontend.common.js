const buildHtml = require("ljas-webpack/buildHtml");
const { merge } = require("webpack-merge");

const templateParameters = require("./templateParameters");
const { PATH_FRONTEND_SRC } = require("../PATHS");

module.exports = merge([
  {
    entry: { app: `${PATH_FRONTEND_SRC}/index.tsx` },

    output: {
      clean: true,
      publicPath: "/",
    },
  },

  // Build EJS templates with injected assets for Express views
  buildHtml({
    filename: "../generated-views/index.ejs",
    template: "!!raw-loader!src/frontend/index.ejs",
    templateParameters,
  }),
]);
