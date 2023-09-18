const buildSass = require('./buildSass')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Enable .sass and .scss file imports and build the CSS with css-loader, mini-css-extract-plugin, and sass-loader.
 * Also add vendor prefixes to CSS with postcss-loader and Autoprefixer:
 * - https://github.com/postcss/autoprefixer
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/plugins/mini-css-extract-plugin
 * - https://webpack.js.org/loaders/postcss-loader
 * - https://webpack.js.org/loaders/sass-loader
 *
 * Tested with:
 * - autoprefixer@^10.4.15
 * - css-loader@^6.8.1
 * - mini-css-extract-plugin@^2.7.6
 * - postcss@^8.4.29
 * - postcss-loader@^7.3.3
 * - sass@~1.64.2
 * - sass-loader@^13.3.2
 *
 * @param {Object} [options] Options object that determines how Autoprefixer, css-loader, mini-css-extract-plugin, postcss-loader, and sass-loader will be configured.
 * @param {Object} [options.autoprefixer] Options for Autoprefixer. (https://github.com/postcss/autoprefixer#options)
 * @param {Object} [options.cssLoader] css-loader options. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Object} [options.miniCssExtractPlugin] Options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#plugin-options)
 * @param {Object} [options.miniCssExtractPluginLoader] mini-css-extract-plugin loader options. (https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options)
 * @param {Object} [options.plugins] webpack's plugins option. Setting this will override `options.miniCssExtractPlugin`. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.postcssLoader] postcss-loader options. Setting this will override `options.autoprefixer`. (https://webpack.js.org/loaders/postcss-loader/#options)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.s[ac]ss$/i] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {Object} [options.sassLoader] sass-loader options. (https://webpack.js.org/loaders/sass-loader/#options)
 * @return {Object} A webpack configuration object that sets up Autoprefixer, css-loader, mini-css-extract-plugin, postcss-loader, and sass-loader.
 */
module.exports = (options) =>
    buildSass({
        rule: {
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: options?.miniCssExtractPluginLoader,
                },
                { loader: 'css-loader', options: options?.cssLoader },
                {
                    loader: 'postcss-loader',
                    options: options?.postcssLoader ?? {
                        postcssOptions: {
                            plugins: [
                                require('autoprefixer')(options?.autoprefixer),
                            ],
                        },
                    },
                },
                { loader: 'sass-loader', options: options?.sassLoader },
            ],
            ...options?.rule,
        },
        plugins: options?.plugins ?? [
            new MiniCssExtractPlugin({ ...options?.miniCssExtractPlugin }),
        ],
    })