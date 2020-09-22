/**
 * Lean JavaScript Application Starter
 * Webpack Configuration Parts
 *
 * GENERAL & JAVASCRIPT
 * v0.2.0
 *
 * https://github.com/mattlean/lean-js-app-starter
 */
const AssetListWebpackPlugin = require("asset-list-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");

/**
 * Delete contents of the output directory using clean-webpack-plugin
 *
 * @param {Object} options clean-webpack-plugin options
 * @return {Object} Plugin config for clean-webpack-plugin
 */
exports.cleanOutput = (options) => ({
  plugins: [new CleanWebpackPlugin(options)],
});

/**
 * Compile JavaScript using babel-loader
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.exclude] Rule exclude value
 * @param {Object} [FnParams.include] Rule include value
 * @param {Object} [FnParams.options] babel-loader options
 * @param {RegExp} [FnParams.test=/\.m?jsx?$/i] Rule test value
 * @return {Object} Module config for babel-loader
 */
exports.compileJS = ({ exclude, include, options, test } = {}) => {
  if (!test) test = /\.m?jsx?$/i;

  return {
    module: {
      rules: [
        {
          test,
          exclude,
          include,
          use: {
            loader: "babel-loader",
            options,
          },
        },
      ],
    },
  };
};

/**
 * Copy files from one location to another with copy-webpack-plugin
 *
 * @param {Array} [patterns] Array of patterns
 * @param {Object} [options] copy-webpack-plugin options
 * @return {Object} Plugin config for copy-webpack-plugin
 */
exports.copyFiles = (patterns, options) => ({
  plugins: [
    new CopyPlugin({
      patterns,
      options,
    }),
  ],
});

/**
 * Generate bundle asset list with asset-list-webpack-plugin
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.format] Format of generated JSON file
 * @param {Object} [FnParams.key] Set keys used for JSON file
 * @param {Object} [FnParams.name] Name of generated JSON file
 * @return {Object} Plugin config for asset-list-webpack-plugin
 */
exports.genAssetList = ({ format, key, name } = {}) => ({
  plugins: [new AssetListWebpackPlugin({ format, key, name })],
});

/**
 * Generate JavaScript source maps
 *
 * @param {string} [type] Option to control how source maps are generated
 * @return {Object} devtool config
 */
exports.genSourceMaps = (type) => ({
  devtool: type,
});

/**
 * Exclude modules from bundle with webpack-node-externals
 *
 * @param {Object} [options] webpack-node-externals options
 * @return {Object} externals config
 */
exports.ignoreNodeModules = (options) => ({
  externals: [nodeExternals(options)],
});

/**
 * Minify JavaScript with terser-webpack-plugin
 *
 * @param {Object} options terser-webpack-plugin options
 * @return {Object} optimization config
 */
exports.minifyJS = (options) => ({
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(options)],
  },
});

/**
 * Set free variable with DefinePlugin
 *
 * @param {string} key Free variable key
 * @param {*} value Free variable value
 * @return {Object} Plugin config
 */
exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new DefinePlugin(env)],
  };
};

/**
 * Set mode to determine which webpack optimizations to use
 *
 * @param {string} [mode] webpack mode configuration optional value
 * @return mode config
 */
exports.setMode = (mode) => ({
  mode,
});

/**
 * Setup development server with webpack-dev-server
 *
 * @param {Object} [devServer] devServer options
 * @return devServer config
 */
exports.setupDevServer = (devServer) => ({
  devServer,
});

/**
 * Split vendor dependencies from main bundle
 *
 * @return optimization config
 */
exports.splitVendor = () => ({
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
});
