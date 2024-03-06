const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { merge } = require('webpack-merge')

const { compileReact, setupDevServer } = require('.')

/**
 * Setup webpack-dev-server and babel-loader to handle React JavaScript code.
 * Also setup Fast Refresh with React Refresh Webpack Plugin.
 * - https://webpack.js.org/loaders/babel-loader
 * - https://webpack.js.org/configuration/dev-server
 * - https://github.com/pmmmwh/react-refresh-webpack-plugin
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-react@^7.22.3
 * - @pmmmwh/react-refresh-webpack-plugin@^0.5.11
 * - babel-loader@^9.1.2
 * - react-refresh@^0.14.0
 * - webpack-dev-server@^4.15.0
 *
 * @param {Object} [options] Options object that determines how babel-loader, React Refresh Webpack Plugin, and webpack-dev-server will be configured.
 * @param {Object} [options.babelLoader] babel-loader options. Setting this will completely override the default Babel configuration. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Object} [options.babelLoaderPlugins] Babel plugins. (https://babeljs.io/docs/plugins)
 * @param {Object} [options.babelLoaderPresets] Babel presets. Setting this will override the default Babel preset configuration. (https://babeljs.io/docs/presets)
 * @param {Object} [options.babelPresetEnv] Babel's preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.babelPresetReact] Babel's preset-react options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-react#options)
 * @param {Object} [options.devServer] Options for webpack-dev-server. (https://webpack.js.org/configuration/dev-server/#devserver)
 * @param {Object} [options.plugins] webpack's plugins option. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.reactRefreshWebpackPlugin] Options for React Refresh Webpack Plugin. (https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md)
 * @param {Object} [options.resolve] webpack's resolve option. (https://webpack.js.org/configuration/resolve)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.jsx?$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {string} [mode=development] The webpack mode configuration option. Babel's preset-react will enable behavior specific to development when this is set to "development".  (https://webpack.js.org/configuration/mode)
 * @return {Object} A webpack configuration object that sets up babel-loader, React Refresh Webpack Plugin, and webpack-dev-server.
 */
const setupReactFastRefreshServer = (options, mode = 'development') => {
    const o = { ...options }
    delete o.devServer
    delete o.reactRefreshWebpackPlugin

    return merge([
        compileReact(
            {
                ...o,
                babelLoaderPlugins: o.babelLoaderPlugins ?? [
                    require.resolve('react-refresh/babel'),
                ],
                plugins: o?.plugins ?? [
                    new ReactRefreshWebpackPlugin(
                        options?.reactRefreshWebpackPlugin,
                    ),
                ],
            },
            mode,
        ),

        setupDevServer({ ...options?.devServer, hot: true }),
    ])
}

module.exports = setupReactFastRefreshServer
