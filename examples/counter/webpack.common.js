const buildHtml = require("ljas-webpack/buildHtml");
const compileTs = require("ljas-webpack/compileTs");
const { merge } = require("webpack-merge");

const { PATH_ROOT, PATH_SRC } = require("./PATHS");

module.exports = merge([
  {
    entry: { app: `${PATH_SRC}/index.ts` },

    output: { clean: true },
  },

  buildHtml({ title: "ljas-counter" }),

  compileTs({
    rule: {
      include: PATH_SRC,
      exclude: [
        /node_modules/,
        /__mocks__\/.*.(j|t)s$/,
        /__tests__\/.*.(j|t)s$/,
        /\.(spec|test)\.(j|t)s$/,
      ],
    },
    babelLoader: {
      cacheDirectory: true,
      configFile: `${PATH_ROOT}/babel.config.js`,
    },
    forkTsChecker: {
      typescript: { configFile: "tsconfig.build.json" },
    },
  }),
]);
