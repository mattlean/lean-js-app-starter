/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              [
                "@babel/preset-react",
                { development: false, runtime: "automatic" },
              ],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },

  plugins: new ForkTsCheckerWebpackPlugin(),

  resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".wasm"] },
};
