/**
 * See webpack.config.js to view the equivalent webpack config
 * with ljas-webpack.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    devServer: { hot: true },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
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
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new ReactRefreshWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configOverwrite: {
                    exclude: [
                        '**/__mocks__',
                        '**/__tests__',
                        '**/*.spec.js',
                        '**/*.spec.jsx',
                        '**/*.spec.ts',
                        '**/*.spec.tsx',
                        '**/*.test.js',
                        '**/*.test.jsx',
                        '**/*.test.ts',
                        '**/*.test.tsx',
                    ],
                },
            },
        }),
    ],

    resolve: { extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.wasm'] },
}
