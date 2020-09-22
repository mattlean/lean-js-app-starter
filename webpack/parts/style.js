/**
 * Lean JavaScript Application Starter
 * Webpack Configuration Parts
 *
 * STYLE
 * v0.2.0
 *
 * https://github.com/mattlean/lean-js-app-starter
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

/**
 * Build styles
 *
 * Runs loaders in this order:
 * 1. Compiles Sass to CSS with sass-loader
 * 2. Runs PostCSS with plugins with postcss-loader
 * 3. Interprets @import and url() like import/require() and resolves them with css-loader
 *
 * Then extracts CSS into separate file with mini-css-extract-plugin.
 *
 * If any loader options are undefined, the loader is not loaded.
 * Loading a loader with no options means you must pass in an empty object.
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.cssLoaderOptions] css-loader options
 * @param {Object} [FnParams.miniCssExtractPluginOptions] mini-css-extract-plugin options
 * @param {Object} [FnParams.postCSSLoaderOptions] postcss-loader options
 * @param {Object} [FnParams.sassLoaderOptions] sass-loader options
 * @param {RegExp} [FnParams.test=/\.(s[ac]ss|css)$/i] Rule test value
 * @return {Object} Module & plugin config for css-loader, mini-css-extract-plugin, postcss-loader, and sass-loader
 */
exports.buildStyles = ({
  cssLoaderOptions,
  miniCssExtractPluginOptions,
  postCSSLoaderOptions,
  sassLoaderOptions,
  test,
} = {}) => {
  if (!test) test = /\.(s[ac]ss|css)$/i;

  const use = [MiniCssExtractPlugin.loader];

  if (cssLoaderOptions) {
    use.push({
      loader: "css-loader",
      options: cssLoaderOptions,
    });
  }

  if (postCSSLoaderOptions) {
    use.push({
      loader: "postcss-loader",
      options: postCSSLoaderOptions,
    });
  }

  if (sassLoaderOptions) {
    use.push({
      loader: "sass-loader",
      options: sassLoaderOptions,
    });
  }

  return {
    module: {
      rules: [
        {
          test,
          use,
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(miniCssExtractPluginOptions)],
  };
};

/**
 * Inject styles
 *
 * Runs loaders in this order:
 * 1. Compiles Sass to CSS with sass-loader
 * 2. Runs PostCSS with Autoprefixer & cssnano plugins
 * 3. Interprets @import and url() like import/require() and resolves them with css-loader
 * 4. Injects CSS into DOM with style-loader
 *
 * If any loader options are undefined, the loader is not loaded.
 * Loading a loader with no options means you must pass in an empty object.
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.cssLoaderOptions] css-loader options
 * @param {Object} [FnParams.postCSSLoaderOptions] postcss-loader options
 * @param {Object} [FnParams.sassLoaderOptions] sass-loader options
 * @param {Object} [FnParams.styleLoaderOptions] style-loader options
 * @param {RegExp} [FnParams.test=/\.(s[ac]ss|css)$/i] Rule test value
 * @return {Object} Module & plugin config for css-loader, postcss-loader, sass-loader, and style-loader
 */
exports.injectStyles = ({
  cssLoaderOptions,
  postCSSLoaderOptions,
  sassLoaderOptions,
  styleLoaderOptions,
  test,
} = {}) => {
  if (!test) test = /\.(s[ac]ss|css)$/i;

  const use = [];

  if (cssLoaderOptions) {
    use.push({
      loader: "style-loader",
      options: styleLoaderOptions,
    });
  }

  if (cssLoaderOptions) {
    use.push({
      loader: "css-loader",
      options: cssLoaderOptions,
    });
  }

  if (postCSSLoaderOptions) {
    use.push({
      loader: "postcss-loader",
      options: postCSSLoaderOptions,
    });
  }

  if (sassLoaderOptions) {
    use.push({
      loader: "sass-loader",
      options: sassLoaderOptions,
    });
  }

  return {
    module: {
      rules: [
        {
          test,
          use,
        },
      ],
    },
  };
};

/**
 * Remove unused CSS with purgecss-webpack-plugin
 *
 * @param {Object} options purgecss-webpack-plugin options
 * @return {Object} Plugin config for purgecss-webpack-plugin
 */
exports.purgeCSS = (options) => ({
  plugins: [new PurgecssPlugin(options)],
});
