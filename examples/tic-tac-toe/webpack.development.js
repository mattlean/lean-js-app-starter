const setupReactFastRefreshServer = require("ljas-webpack/setupReactFastRefreshServer");
const {
  buildSourceMaps,
  ignoreWatch,
  injectCss,
  loadFonts,
  loadImages,
} = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_BUILD_DEV, PATH_ROOT, PATH_SRC } = require("./PATHS");

if (!process.env.PORT_WEBPACK_DEV_SERVER) {
  throw new Error("🔴 webpack-dev-server port was not set");
}

module.exports = merge([
  {
    mode: "development",

    output: {
      filename: "[name].js",
      path: PATH_BUILD_DEV,
    },

    target: "browserslist:development",
  },

  buildSourceMaps("cheap-module-source-map"),

  ignoreWatch(/node_modules/),

  injectCss({ rule: { include: PATH_SRC } }),

  loadFonts({
    rule: {
      generator: { filename: "assets/[name][ext][query]" },
      // Export the asset as a data URI if it's below the maxSize threshold,
      // otherwise emit it as a separate file and export the URL
      parser: { dataUrlCondition: { maxSize: 50000 } },
      type: "asset",
    },
  }),

  loadImages({
    rule: {
      generator: { filename: "assets/[name][ext][query]" },
      // Export the asset as a data URI if it's below the maxSize threshold,
      // otherwise emit it as a separate file and export the URL
      parser: { dataUrlCondition: { maxSize: 15000 } },
      type: "asset",
    },
  }),

  setupReactFastRefreshServer({
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
      configFile: `${PATH_ROOT}/babel.config.js`,
    },
    devServer: {
      historyApiFallback: true,
      port: process.env.PORT_WEBPACK_DEV_SERVER,
      watchFiles: ["src/**/*.ejs"],
    },
  }),
]);
