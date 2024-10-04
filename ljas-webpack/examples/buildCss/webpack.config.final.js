/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                sideEffects: true,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },

    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },

    plugins: [new MiniCssExtractPlugin()],
}
