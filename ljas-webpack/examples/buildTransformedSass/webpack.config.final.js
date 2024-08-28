/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
const autoprefixer = require('autoprefixer')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                sideEffects: true,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer()],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },

    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },

    plugins: [new MiniCssExtractPlugin()],
}