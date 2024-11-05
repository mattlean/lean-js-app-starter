/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/index.ts",

  output: { filename: "main.js", path: path.resolve(__dirname, "build") },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },

  devServer: {},

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],

  resolve: { extensions: [".js", ".json", ".ts", ".wasm"] },
};
