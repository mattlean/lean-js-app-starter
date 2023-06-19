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
 * @param {Object} [options.babelPresetEnv] Babel's preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.plugins] webpack's plugins option. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.resolve] webpack's resolve option. (https://webpack.js.org/configuration/resolve)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.js$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Be careful, setting this will override most, if not all, default behavior provided by this function. (https://webpack.js.org/configuration/module/#useentry)
 * @return {Object} A webpack configuration object that sets up babel-loader.
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
                ...options?.rule,
                test: options?.rule?.test ?? /\.js$/,
                exclude: options?.rule?.exclude ?? /node_modules/,
            },
        ],
    },
    plugins: options?.plugins,
    resolve: options?.resolve,
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
 * @param {Object} [options] Options object that determines how babel-loader will be configured.
 * @param {Object} [options.babelLoader] babel-loader options. Setting this will override Babel preset options. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Object} [options.babelPresetEnv] Babel's preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.babelPresetReact] Babel's preset-react options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-react#options)
 * @param {Object} [options.plugins] webpack's plugins option. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.resolve] webpack's resolve option. (https://webpack.js.org/configuration/resolve)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.jsx?$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Be careful, setting this will override most, if not all, default behavior provided by this function. (https://webpack.js.org/configuration/module/#useentry)
 * @param {string} [mode] The webpack mode configuration option. Babel's preset-react will enable behavior specific to development when this is set to "development".  (https://webpack.js.org/configuration/mode)
 * @return {Object} A webpack configuration object that sets up babel-loader.
 */
exports.compileReact = (options, mode) =>
    this.compileJs({
        rule: {
            use: {
                loader: 'babel-loader',
                options: options?.babelLoader ?? {
                    presets: [
                        [
                            '@babel/preset-env',
                            options?.babelPresetEnv ?? { modules: false },
                        ],
                        [
                            '@babel/preset-react',
                            options?.babelPresetReact ?? {
                                development: mode === 'development',
                                runtime: 'automatic',
                            },
                        ],
                    ],
                },
            },
            ...options?.rule,
            test: options?.rule?.test ?? /\.jsx?$/,
        },
        plugins: options?.plugins,
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.wasm'],
            ...options?.resolve,
        },
    })

/**
 * Configure webpack-dev-server:
 * https://webpack.js.org/configuration/dev-server
 *
 * Tested with: webpack-dev-server@^4.15.0
 *
 * @param {Object} [options] Options for webpack-dev-server. (https://webpack.js.org/configuration/dev-server/#devserver)
 */
exports.setupDevServer = (options) => ({
    devServer: {
        ...options,
    },
})
