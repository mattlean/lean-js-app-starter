const buildHtml = require("ljas-webpack/buildHtml");
const { merge } = require("webpack-merge");

const { PATH_RENDERER_SRC } = require("../PATHS");

module.exports = merge([
  {
    entry: { renderer: `${PATH_RENDERER_SRC}/index.jsx` },

    output: { clean: true },
  },

  buildHtml({
    title: "ljas-react-electron",
    template: "src/renderer/index.ejs",
  }),
]);
