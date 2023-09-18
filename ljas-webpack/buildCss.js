const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Enable .css file imports and build the CSS with css-loader and mini-css-extract-plugin:
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/plugins/mini-css-extract-plugin
 *
 * Tested with:
 * - css-loader@^6.8.1
 * - mini-css-extract-plugin@^2.7.6
 *
 * @param {Object} [options] Options object that determines how css-loader and mini-css-extract-plugin will be configured.
 * @param {Object} [options.cssLoader] css-loader options. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Object} [options.miniCssExtractPlugin] Options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#plugin-options)
 * @param {Object} [options.miniCssExtractPluginLoader] mini-css-extract-plugin loader options. (https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options)
 * @param {Object} [options.plugins] webpack's plugins option. Setting this will override `options.miniCssExtractPlugin`. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.css$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @return {Object} webpack configuration object that sets up css-loader and mini-css-extract-plugin.
 */
const buildCss = (options) => ({
    module: {
        rules: [
            {
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: options?.miniCssExtractPluginLoader,
                    },
                    { loader: 'css-loader', options: options?.cssLoader },
                ],
                sideEffects: true,
                ...options?.rule,
                exclude: options?.rule?.exclude ?? /node_modules/,
                test: options?.rule?.test ?? /\.css$/,
            },
        ],
    },

    plugins: options?.plugins ?? [
        new MiniCssExtractPlugin({ ...options?.miniCssExtractPlugin }),
    ],
})

module.exports = buildCss
