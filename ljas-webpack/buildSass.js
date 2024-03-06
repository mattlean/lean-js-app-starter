const buildCss = require('./buildCss')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Enable .sass and .scss file imports and build the CSS with css-loader, mini-css-extract-plugin, and sass-loader.
 * When running in production, minify CSS with css-minimizer-webpack-plugin:
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/plugins/css-minimizer-webpack-plugin
 * - https://webpack.js.org/plugins/mini-css-extract-plugin
 * - https://webpack.js.org/loaders/sass-loader
 *
 * Tested with:
 * - css-loader@^6.8.1
 * - css-minimizer-webpack-plugin@^6.0.0
 * - mini-css-extract-plugin@^2.7.6
 * - sass@~1.64.2
 * - sass-loader@^13.3.2
 *
 * @param {Object} [options] Options object that determines how css-loader, css-minimizer-webpack-plugin, mini-css-extract-plugin, and sass-loader will be configured.
 * @param {Object} [options.cssLoader] css-loader options. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Object} [options.miniCssExtractPlugin] Options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#plugin-options)
 * @param {Object} [options.miniCssExtractPluginLoader] mini-css-extract-plugin loader options. (https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options)
 * @param {Object} [options.plugins] webpack's plugins option. Setting this will override `options.miniCssExtractPlugin`. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.s[ac]ss$/i] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {Object} [options.sassLoader] sass-loader options. (https://webpack.js.org/loaders/sass-loader/#options)
 * @return {Object} webpack configuration object that sets up css-loader, css-minimizer-webpack-plugin, mini-css-extract-plugin, and sass-loader.
 */
const buildSass = (options) =>
    buildCss({
        rule: {
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: options?.miniCssExtractPluginLoader,
                },
                { loader: 'css-loader', options: options?.cssLoader },
                { loader: 'sass-loader', options: options?.sassLoader },
            ],
            ...options?.rule,
            test: options?.rule?.test ?? /\.s[ac]ss$/i,
        },
        plugins: options?.plugins ?? [
            new MiniCssExtractPlugin({ ...options?.miniCssExtractPlugin }),
        ],
    })

module.exports = buildSass
