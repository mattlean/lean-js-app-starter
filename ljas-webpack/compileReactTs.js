const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { compileReact } = require('.')
const { FORK_TS_CHECKER_DEFAULT_REACT_OPTIONS } = require('./constants')

/**
 * Compile React TypeScript code with babel-loader and type check with Fork TS Checker Webpack Plugin:
 * - https://webpack.js.org/loaders/babel-loader
 * - https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-react@^7.22.3
 * - @babel/preset-typescript@^7.21.5
 * - babel-loader@^9.1.2
 * - fork-ts-checker-webpack-plugin@^8.0.0
 *
 * @param {Object} [options] Options object that determines how babel-loader and Fork TS Checker Webpack Plugin will be configured.
 * @param {Object} [options.babelLoader] babel-loader options. Setting this will completely override the default Babel configuration. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Object} [options.babelLoaderPlugins] Babel plugins. (https://babeljs.io/docs/plugins)
 * @param {Object} [options.babelLoaderPresets] Babel presets. Setting this will override the default Babel preset configuration. (https://babeljs.io/docs/presets)
 * @param {Object} [options.babelPresetEnv] Babel's preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.babelPresetReact] Babel's preset-react options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-react#options)
 * @param {Object} [options.babelPresetTypeScript] Babel's preset-typescript options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.forkTsChecker] Options for Fork TS Checker Webpack Plugin. By default it overrides TSConfig's exclude option to ignore tests. Will be overwritten by `options.plugins` if it is set. (https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options)
 * @param {Object} [options.plugins] webpack's plugins option. Setting this will override `options.forkTsChecker`. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.resolve] webpack's resolve option. (https://webpack.js.org/configuration/resolve)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.[jt]sx?$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {string} [mode] The webpack mode configuration option. Babel's preset-react will enable behavior specific to development when this is set to "development".  (https://webpack.js.org/configuration/mode)
 * @return {Object} A webpack configuration object that sets up babel-loader and Fork TS Checker Webpack Plugin.
 */
const compileReactTs = (options, mode) =>
    compileReact(
        {
            rule: {
                use: {
                    loader: 'babel-loader',
                    options: options?.babelLoader ?? {
                        plugins: options?.babelLoaderPlugins,
                        presets: options?.babelLoaderPresets ?? [
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
                            [
                                '@babel/preset-typescript',
                                options?.babelPresetTypeScript,
                            ],
                        ],
                    },
                },
                ...options?.rule,
                test: options?.rule?.test ?? /\.[jt]sx?$/,
            },
            plugins: options?.plugins ?? [
                new ForkTsCheckerWebpackPlugin(
                    options?.forkTsChecker ??
                        FORK_TS_CHECKER_DEFAULT_REACT_OPTIONS
                ),
            ],
            resolve: {
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.wasm'],
                ...options?.resolve,
            },
        },
        mode
    )

module.exports = compileReactTs