const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/**
 * Compile React TypeScript code with babel-loader:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-react@^7.22.3
 * - @babel/preset-typescript@^7.21.5
 * - babel-loader@^9.1.2
 *
 * @param {Object} [babelConfig]
 * @param {Object} [forkTsCheckerOptions]
 * @param {string} [mode] The webpack mode configuration option. (https://webpack.js.org/configuration/mode)
 */
module.exports = (babelConfig, forkTsCheckerOptions, mode) => ({
    module: {
        rules: [
            {
                test: babelConfig?.test ?? /\.[jt]sx?$/,
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
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
        ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions)],

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.wasm'],
    },
})
