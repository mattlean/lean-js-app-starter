/**
 * ljas-webpack
 *
 * This build was tested with:
 * - webpack@^5.85.0
 * - webpack-cli@^5.1.1
 */

/**
 * Compile React JavaScript code with babel-loader:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-react@^7.22.3
 * - babel-loader@^9.1.2
 *
 * @param {Object} [babelConfig]
 * @param {string} [mode] The webpack mode configuration option. (https://webpack.js.org/configuration/mode)
 */
exports.compileReact = (babelConfig, mode) => ({
    module: {
        rules: [
            {
                test: babelConfig?.test ?? /\.jsx?$/,
                exclude: babelConfig?.exclude ?? /node_modules/,
                include: babelConfig?.include,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig?.options ?? {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            [
                                '@babel/preset-react',
                                {
                                    development: mode === 'development',
                                    runtime: 'automatic',
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.wasm'],
    },
})

/**
 * Configure webpack-dev-server:
 * https://webpack.js.org/configuration/dev-server
 *
 * Tested with: webpack-dev-server@^4.15.0
 *
 * @param {Object} [options] Options for webpack-dev-server. (https://webpack.js.org/configuration/dev-server)
 */
exports.setupDevServer = (options) => ({
    devServer: {
        ...options,
    },
})
