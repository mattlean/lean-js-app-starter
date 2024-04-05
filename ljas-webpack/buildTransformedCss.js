const autoprefixer = require('autoprefixer')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildCss = require('./buildCss')

/**
 * Enable .css file imports and build the CSS with css-loader and mini-css-extract-plugin.
 * Enable transformations with postcss-loader. By default, add vendor prefixes with Autoprefixer.
 * When running in production, minify CSS with css-minimizer-webpack-plugin:
 * - https://github.com/postcss/autoprefixer
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/plugins/css-minimizer-webpack-plugin
 * - https://webpack.js.org/plugins/mini-css-extract-plugin
 * - https://webpack.js.org/loaders/postcss-loader
 *
 * Tested with:
 * - autoprefixer@^10.4.16
 * - css-loader@^6.8.1
 * - css-minimizer-webpack-plugin@^6.0.0
 * - mini-css-extract-plugin@^2.7.6
 * - postcss@^8.4.29
 * - postcss-loader@^7.3.3
 *
 * @param {Object} [options] Options object that determines how Autoprefixer, css-loader, css-minimizer-webpack-plugin, mini-css-extract-plugin, and postcss-loader will be configured.
 * @param {Object} [options.autoprefixer] Options for Autoprefixer. (https://github.com/postcss/autoprefixer#options)
 * @param {Object} [options.cssLoader] css-loader options. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Object} [options.cssMinimizer] css-minimizer-webpack-plugin options. (https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#options)
 * @param {Object} [options.miniCssExtractPlugin] Options for mini-css-extract-plugin. (https://webpack.js.org/plugins/mini-css-extract-plugin/#plugin-options)
 * @param {Object} [options.miniCssExtractPluginLoader] mini-css-extract-plugin loader options. (https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options)
 * @param {Object} [options.minimizer] webpack optimization option's minimizer option. Setting this will override `options.cssMinimizer`. (https://webpack.js.org/configuration/optimization/#optimizationminimizer)
 * @param {Object} [options.plugins] webpack's plugins option. Setting this will override `options.miniCssExtractPlugin`. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.postcssLoader] postcss-loader options. Setting this will override `options.autoprefixer`. (https://webpack.js.org/loaders/postcss-loader/#options)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.css$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @returns {Object} A webpack configuration object that sets up Autoprefixer, css-loader, css-minimizer-webpack-plugin, mini-css-extract-plugin, and postcss-loader.
 */
const buildTransformedCss = (options) =>
    buildCss({
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
                            plugins: [autoprefixer(options?.autoprefixer)],
                        },
                    },
                },
            ],
            ...options?.rule,
        },
        plugins: options?.plugins ?? [
            new MiniCssExtractPlugin({ ...options?.miniCssExtractPlugin }),
        ],
        optimization: {
            minimizer: options?.minimizer ?? [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
                `...`,
                new CssMinimizerPlugin(options?.cssMinimizer),
            ],
        },
    })

module.exports = buildTransformedCss
