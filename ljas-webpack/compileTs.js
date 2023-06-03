const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/**
 * Compile TypeScript code with babel-loader:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Tested with:
 * - @babel/core@"^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-typescript@^7.21.5
 * - babel-loader@^9.1.2
 *
 * @param {Object} [babelArgs]
 * @param {Object} [forkTsCheckerOptions]
 */
module.exports = (babelArgs, forkTsCheckerOptions) => ({
    module: {
        rules: [
            {
                test: babelArgs?.test ?? /\.[jt]sx?$/,
                exclude: babelArgs?.exclude ?? /node_modules/,
                include: babelArgs?.include,
                use: {
                    loader: 'babel-loader',
                    options: babelArgs?.options ?? {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
        ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions)],

    resolve: {
        extensions: ['.js', '.json', '.ts', '.wasm'],
    },
})
