const injectTransformedSass = require("ljas-webpack/injectTransformedSass");
const setupReactFastRefreshServerTs = require("ljas-webpack/setupReactFastRefreshServerTs");
const { buildSourceMaps, ignoreWatch } = require("ljas-webpack");
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

  injectTransformedSass({ rule: { include: PATH_SRC } }),

  setupReactFastRefreshServerTs({
    rule: {
      include: PATH_SRC,
      exclude: [
        /node_modules/,
        /__mocks__\/.*.(j|t)sx?$/,
        /__tests__\/.*.(j|t)sx?$/,
        /\.(spec|test)\.(j|t)sx?$/,
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
    forkTsChecker: {
      typescript: { configFile: "tsconfig.build.json" },
    },
  }),
]);
