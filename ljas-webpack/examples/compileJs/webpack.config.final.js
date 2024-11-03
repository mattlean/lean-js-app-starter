/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]],
          },
        },
      },
    ],
  },
};
