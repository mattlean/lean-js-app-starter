/**
 * ljas-webpack
 *
 * This build was tested with:
 * - webpack@^5.85.0
 * - webpack-cli@^5.1.1
 */

/**
 * Compile JavaScript code with babel-loader:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - babel-loader@^9.1.2
 *
 * @param {Object} [options] Options object that determines how babel-loader will be configured.
 * @param {Object} [options.babelLoader] babel-loader options. Setting this will override Babel preset options. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Object} [options.babelPresetEnv] @babel/preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {RegExp} [options.rule.test=/\.js?$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @return {Object} A webpack module configuration object that sets up babel-loader.
 */
exports.compileJs = (options) => ({
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: options?.babelLoader ?? {
                        presets: [
                            [
                                '@babel/preset-env',
                                options?.babelPresetEnv ?? {
                                    // This is set so Babel will preserve ECMAScript modules and pass it
                                    // onto webpack so it can tree shake.
                                    // TODO: Note that this might not be needed anymore and "auto" might
                                    // work... need to look more into this.
                                    modules: false,
                                },
                            ],
                        ],
                    },
                },
                ...{
                    ...options?.rule,
                    test: options?.rule?.test ?? /\.js?$/,
                    exclude: options?.rule?.exclude ?? /node_modules/,
                    include: options?.rule?.include,
                },
            },
        ],
    },
})

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
