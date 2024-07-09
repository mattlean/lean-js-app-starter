/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            [
                                '@babel/preset-react',
                                { development: false, runtime: 'automatic' },
                            ],
                        ],
                    },
                },
            },
        ],
    },

    resolve: { extensions: ['.js', '.jsx', '.json', '.wasm'] },
}
