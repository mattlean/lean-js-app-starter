const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
                sideEffects: true,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            {
                test: /\.(eot|otf|ttf|woff|woff2)$/i,
                type: 'asset/resource',
            },
        ],
    },

    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },

    plugins: [new MiniCssExtractPlugin()],
}
