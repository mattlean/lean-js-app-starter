/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
