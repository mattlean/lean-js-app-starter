const buildHtml = require("ljas-webpack/buildHtml");
const { merge } = require("webpack-merge");

const { PATH_RENDERER_SRC } = require("../PATHS");

module.exports = merge([
  {
    entry: {
      colormode: `${PATH_RENDERER_SRC}/colorMode.ts`,
      ["setup-colormode"]: {
        import: `${PATH_RENDERER_SRC}/setupColorMode.ts`,
        dependOn: "colormode",
      },
      renderer: {
        import: `${PATH_RENDERER_SRC}/index.tsx`,
        dependOn: "colormode",
      },
    },

    output: { clean: true },
  },

  buildHtml({
    title: "ljas-markdown-editor",
    template: "src/renderer/index.ejs",
  }),
]);
