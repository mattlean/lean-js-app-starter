const autoprefixer = require("autoprefixer");

const { injectCss } = require(".");

/**
 * Enable .css file imports and inject CSS into the DOM with css-loader and style-loader.
 * Enable transformations with postcss-loader. By default, add vendor prefixes with Autoprefixer:
 * - https://github.com/postcss/autoprefixer
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/loaders/postcss-loader
 * - https://webpack.js.org/loaders/style-loader
 *
 * Tested with:
 * - autoprefixer@^10.4.16
 * - css-loader@^6.8.1
 * - postcss@^8.4.29
 * - postcss-loader@^7.3.3
 * - style-loader@^3.3.3
 *
 * @param {Object} [options] Options object that determines how Autoprefixer, css-loader, postcss-loader, and style-loader will be configured.
 * @param {Object} [options.autoprefixer] Options for Autoprefixer. (https://github.com/postcss/autoprefixer#options)
 * @param {Object} [options.cssLoader] css-loader options. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Object} [options.postcssLoader] postcss-loader options. Setting this will override `options.autoprefixer`. (https://webpack.js.org/loaders/postcss-loader/#options)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.css$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {Object} [options.styleLoader] style-loader options. (https://webpack.js.org/loaders/style-loader/#options)
 * @returns {Object} webpack configuration object that sets up Autoprefixer, css-loader, postcss-loader, and style-loader.
 */
const injectTransformedCss = (options) =>
  injectCss({
    rule: {
      use: [
        {
          loader: "style-loader",
          options: options?.styleLoader,
        },
        { loader: "css-loader", options: options?.cssLoader },
        {
          loader: "postcss-loader",
          options: options?.postcssLoader ?? {
            postcssOptions: {
              plugins: [autoprefixer(options?.autoprefixer)],
            },
          },
        },
      ],
      ...options?.rule,
    },
  });

module.exports = injectTransformedCss;
