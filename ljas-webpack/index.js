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
 * - @babel/core@"^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-react@^7.22.3
 * - babel-loader@^9.1.2
 *
 * @param {Object} [args] Arguments used to configure babel-loader.
 * @param {string} [mode] The webpack mode configuration option. (https://webpack.js.org/configuration/mode)
 */
exports.compileReact = (args, mode) => ({
    module: {
        rules: [
            {
                test: args?.test ?? /\.js$/,
                exclude: args?.exclude ?? /node_modules/,
                include: args?.include,
                use: {
                    loader: 'babel-loader',
                    options: args?.options ?? {
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
