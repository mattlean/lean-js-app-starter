const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { compileJs } = require('./')

/**
 * Compile TypeScript code with babel-loader:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-typescript@^7.21.5
 * - babel-loader@^9.1.2
 * - fork-ts-checker-webpack-plugin@^8.0.0
 *
 * @param {Object} [options] Options object that determines how babel-loader will be configured.
 * @param {Object} [options.babelLoader] babel-loader options. Setting this will override Babel preset options. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Object} [options.babelPresetEnv] Babel's preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.babelPresetTypeScript] Babel's preset-typescript options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.forkTsChecker] Options for Fork TS Checker Webpack Plugin. Will be overwritten by `options.plugins` if it is set. (https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options)
 * @param {Object} [options.plugins] webpack's plugins option. Setting this will override `options.forkTsChecker`. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.resolve] webpack's resolve option. (https://webpack.js.org/configuration/resolve)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.[jt]s$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Be careful, setting this will override most, if not all, default behavior provided by this function. (https://webpack.js.org/configuration/module/#useentry)
 * @return {Object} A webpack configuration object that sets up babel-loader.
 */
module.exports = (options) =>
    compileJs({
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
                            '@babel/preset-typescript',
                            options?.babelPresetTypeScript ?? undefined,
                        ],
                    ],
                },
            },
            ...options?.rule,
            test: options?.rule?.test ?? /\.[jt]s$/,
        },
        plugins: options?.plugins ?? [
            new ForkTsCheckerWebpackPlugin(options?.forkTsChecker),
        ],
        resolve: {
            extensions: ['.js', '.json', '.ts', '.wasm'],
            ...options?.resolve,
        },
    })