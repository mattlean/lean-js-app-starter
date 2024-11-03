/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|jpeg|jpg|png|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};
