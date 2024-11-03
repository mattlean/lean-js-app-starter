/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  devServer: { hot: true },

  mode: "development",

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [require.resolve("react-refresh/babel")],
            presets: [
              ["@babel/preset-env", { modules: false }],
              [
                "@babel/preset-react",
                { development: false, runtime: "automatic" },
              ],
            ],
          },
        },
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin(), new ReactRefreshWebpackPlugin()],

  resolve: { extensions: [".js", ".jsx", ".json", ".wasm"] },
};
