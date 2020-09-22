/**
 * Lean JavaScript Application Starter
 * Webpack Configuration Parts
 *
 * REACT
 * v0.2.0
 *
 * https://github.com/mattlean/lean-js-app-starter
 */

/**
 * Use SVGs as React components and inline them with @svgr/webpack
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.options] @svgr/webpack options
 * @param {RegExp} [FnParams.test=/\.svg$/i] Rule test value
 * @return Module config for @svgr/webpack
 */
exports.inlineReactSVGs = ({ options, test } = {}) => {
  if (!test) test = /\.svg$/i;

  return {
    module: {
      rules: [
        {
          test,
          use: {
            loader: "@svgr/webpack",
            options,
          },
        },
      ],
    },
  };
};
