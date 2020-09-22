/**
 * Lean JavaScript Application Starter
 * Webpack Configuration Parts
 *
 * MEDIA
 * v0.2.0
 *
 * https://github.com/mattlean/lean-js-app-starter
 */

/**
 * Emit images into output directory with file-loader
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.exclude] Rule exclude value
 * @param {Object} [FnParams.include] Rule include value
 * @param {Object} [FnParams.options] url-loader options
 * @param {RegExp} [FnParams.test=/\.(gif|jpe?g|mov|mp4|png)$/i] Rule test value
 * @return {Object} Module config for file-loader
 */
exports.emitMedia = ({ exclude, include, options, test } = {}) => {
  if (!options) options = { name: "[name].[ext]" };

  if (!test) test = /\.(gif|jpe?g|mov|mp4|png)$/i;

  return {
    module: {
      rules: [
        {
          test,
          exclude,
          include,
          use: {
            loader: "file-loader",
            options,
          },
        },
      ],
    },
  };
};

/**
 * Inline images with url-loader
 * If media is too large, then emit images into output directory with file-loader
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.exclude] Rule exclude value
 * @param {Object} [FnParams.include] Rule include value
 * @param {Object} [FnParams.options] url-loader options
 * @param {RegExp} [FnParams.test=/\.(gif|jpe?g|mov|mp4|png)$/i] Rule test value
 * @return {Object} Module config for url-loader
 */
exports.inlineMedia = ({ exclude, include, options, test } = {}) => {
  if (!options) options = { limit: 15000, name: "[name].[ext]" };

  if (!test) test = /\.(gif|jpe?g|mov|mp4|png)$/i;

  return {
    module: {
      rules: [
        {
          test,
          exclude,
          include,
          use: {
            loader: "url-loader",
            options,
          },
        },
      ],
    },
  };
};
