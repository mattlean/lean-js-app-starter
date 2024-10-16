/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: {},

    plugins: [new HtmlWebpackPlugin()],
}
