/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
}
