/**
 * ljas-webpack
 *
 * This build was tested with:
 * - webpack@^5.85.0
 * - webpack-cli@^5.1.1
 */

/**
 * Build source maps:
 * https://webpack.js.org/configuration/devtool
 *
 * @param {string} devtool Option that chooses a style of source mapping. (https://webpack.js.org/configuration/devtool)
 * @returns {Object} A webpack configuration object that sets up the webpack devtool option.
 */
exports.buildSourceMaps = (devtool) => ({ devtool });

/**
 * Compile JavaScript code with babel-loader:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - babel-loader@^9.1.2
 *
 * @param {Object} [options] Options object that determines how babel-loader will be configured.
 * @param {Object} [options.babelLoader] babel-loader options. Setting this will completely override the default Babel configuration. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {boolean} [options.babelLoaderCache] babel-loader-specific option that enables the cache when true. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Object} [options.babelLoaderPlugins] Babel plugins. (https://babeljs.io/docs/plugins)
 * @param {Object} [options.babelLoaderPresets] Babel presets. Setting this will override the default Babel preset configuration. (https://babeljs.io/docs/presets)
 * @param {Object} [options.babelPresetEnv] Babel's preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.plugins] webpack's plugins option. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.resolve] webpack's resolve option. (https://webpack.js.org/configuration/resolve)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.js$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @returns {Object} A webpack configuration object that sets up babel-loader.
 */
exports.compileJs = (options) => ({
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: options?.babelLoader ?? {
            cacheDirectory: options?.babelLoaderCache,
            plugins: options?.babelLoaderPlugins,
            presets: options?.babelLoaderPresets ?? [
              [
                "@babel/preset-env",
                options?.babelPresetEnv ?? {
                  // This is set so Babel will preserve ECMAScript modules and pass it
                  // onto webpack so it can tree shake.
                  // TODO: Note that this might not be needed anymore and "auto" might
                  // work... need to look more into this. If this is changed, remember
                  // to update every other related function default like compileReactTs() as well.
                  modules: false,
                },
              ],
            ],
          },
        },
        ...options?.rule,
        exclude: options?.rule?.exclude ?? /node_modules/,
        test: options?.rule?.test ?? /\.js$/,
      },
    ],
  },
  plugins: options?.plugins,
  resolve: options?.resolve,
});

/**
 * Compile React JavaScript code with babel-loader:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Tested with:
 * - @babel/core@^7.22.1
 * - @babel/preset-env@^7.22.4
 * - @babel/preset-react@^7.22.3
 * - babel-loader@^9.1.2
 *
 * @param {Object} [options] Options object that determines how babel-loader will be configured.
 * @param {Object} [options.babelLoader] babel-loader options. Setting this will completely override the default Babel configuration. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {boolean} [options.babelLoaderCache] babel-loader-specific option that enables the cache when true. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Object} [options.babelLoaderPlugins] Babel plugins. (https://babeljs.io/docs/plugins)
 * @param {Object} [options.babelLoaderPresets] Babel presets. Setting this will override the default Babel preset configuration. (https://babeljs.io/docs/presets)
 * @param {Object} [options.babelPresetEnv] Babel's preset-env options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-env#options)
 * @param {Object} [options.babelPresetReact] Babel's preset-react options. Will be overwritten by `options.babelLoader` if it is set. (https://babeljs.io/docs/babel-preset-react#options)
 * @param {Object} [options.plugins] webpack's plugins option. (https://webpack.js.org/configuration/plugins)
 * @param {Object} [options.resolve] webpack's resolve option. (https://webpack.js.org/configuration/resolve)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.jsx?$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {string} [mode] The webpack mode configuration option. Babel's preset-react will enable behavior specific to development when this is set to "development".  (https://webpack.js.org/configuration/mode)
 * @returns {Object} A webpack configuration object that sets up babel-loader.
 */
exports.compileReact = (options, mode) =>
  this.compileJs({
    rule: {
      use: {
        loader: "babel-loader",
        options: options?.babelLoader ?? {
          cacheDirectory: options?.babelLoaderCache,
          plugins: options?.babelLoaderPlugins,
          presets: options?.babelLoaderPresets ?? [
            [
              "@babel/preset-env",
              options?.babelPresetEnv ?? { modules: false },
            ],
            [
              "@babel/preset-react",
              options?.babelPresetReact ?? {
                development: mode === "development",
                runtime: "automatic",
              },
            ],
          ],
        },
      },
      ...options?.rule,
      test: options?.rule?.test ?? /\.jsx?$/,
    },
    plugins: options?.plugins,
    resolve: {
      extensions: [".js", ".jsx", ".json", ".wasm"],
      ...options?.resolve,
    },
  });

/**
 * Ignore files when webpack is running in watch mode:
 * https://webpack.js.org/configuration/watch
 *
 * @param {string|Array.<string>} ignored RegEx or globs to match folders and files that will be ignored. (https://webpack.js.org/configuration/watch/#watchoptionsignored)
 * @returns {Object} A webpack configuration object that makes webpack ignore specified files during watch mode.
 */
exports.ignoreWatch = (ignored) => ({
  watchOptions: { ignored },
});

/**
 * Enable .css file imports and inject CSS into the DOM with css-loader and style-loader:
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/loaders/style-loader
 *
 * Tested with:
 * - css-loader@^6.8.1
 * - style-loader@^3.3.3
 *
 * @param {Object} [options] Options object that determines how css-loader and style-loader will be configured.
 * @param {Object} [options.cssLoader] css-loader options. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.css$/] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {Object} [options.styleLoader] style-loader options. (https://webpack.js.org/loaders/style-loader/#options)
 * @returns {Object} webpack configuration object that sets up css-loader and style-loader.
 */
exports.injectCss = (options) => ({
  module: {
    rules: [
      {
        use: [
          { loader: "style-loader", options: options?.styleLoader },
          { loader: "css-loader", options: options?.cssLoader },
        ],
        ...options?.rule,
        exclude: options?.rule?.exclude ?? /node_modules/,
        test: options?.rule?.test ?? /\.css$/,
      },
    ],
  },
});

/**
 * Enable .sass and .scss file imports and inject CSS into the DOM with css-loader, sass-loader, and style-loader:
 * - https://webpack.js.org/loaders/css-loader
 * - https://webpack.js.org/loaders/sass-loader
 * - https://webpack.js.org/loaders/style-loader
 *
 * Tested with:
 * - css-loader@^6.8.1
 * - sass@~1.64.2
 * - sass-loader@^13.3.2
 * - style-loader@^3.3.3
 *
 * @param {Object} [options] Options object that determines how css-loader, sass-loader, and style-loader will be configured.
 * @param {Object} [options.cssLoader] css-loader options. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.exclude=/node_modules/] Exclude option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {RegExp} [options.rule.include] Include option associated with the webpack rule. It is recommended to set this to improve build performance. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {Object} [options.rule.resolve] Resolve option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruleresolve)
 * @param {RegExp} [options.rule.test=/\.s[ac]ss$/i] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {Object} [options.rule.use] webpack UseEntry associated with the webpack rule. Setting this will override most of the default configuration. (https://webpack.js.org/configuration/module/#useentry)
 * @param {Object} [options.sassLoader] sass-loader options. (https://webpack.js.org/loaders/sass-loader/#options)
 * @param {Object} [options.styleLoader] style-loader options. (https://webpack.js.org/loaders/style-loader/#options)
 * @returns {Object} webpack configuration object that sets up css-loader, sass-loader, and style-loader.
 */
exports.injectSass = (options) =>
  this.injectCss({
    rule: {
      use: [
        { loader: "style-loader", options: options?.styleLoader },
        { loader: "css-loader", options: options?.cssLoader },
        { loader: "sass-loader", options: options?.sassLoader },
      ],
      ...options?.rule,
      test: options?.rule?.test ?? /\.s[ac]ss$/i,
    },
  });

/**
 * Enable imports of font files (.eot, .otf, .ttf, .woff, .woff2) with an asset module:
 * https://webpack.js.org/guides/asset-modules
 *
 * @param {Object} [options] Options object that determines how the asset module will be configured.
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.test=/\.(eot|otf|ttf|woff|woff2)$/i] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {string} [options.rule.type=asset/resource] Option that determines the type of asset module to use. (https://webpack.js.org/configuration/module/#ruletype)
 * @returns webpack configuration object that sets up an asset module to support fonts.
 */
exports.loadFonts = (options) => ({
  module: {
    rules: [
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        type: "asset/resource",
        ...options?.rule,
      },
    ],
  },
});

/**
 * Enable imports of image files (.gif, .jpeg, .jpg, .png, .svg) with an asset module:
 * https://webpack.js.org/guides/asset-modules
 *
 * @param {Object} [options] Options object that determines how the asset module will be configured.
 * @param {Object} [options.rule] webpack rule. (https://webpack.js.org/configuration/module/#rule)
 * @param {RegExp} [options.rule.test=/\.(gif|jpeg|jpg|png|svg)$/i] Test option associated with the webpack rule. (https://webpack.js.org/configuration/module/#ruletest)
 * @param {string} [options.rule.type=asset/resource] Option that determines the type of asset module to use. (https://webpack.js.org/configuration/module/#ruletype)
 * @returns webpack configuration object that sets up an asset module to support images.
 */
exports.loadImages = (options) => ({
  module: {
    rules: [
      {
        test: /\.(gif|jpeg|jpg|png|svg)$/i,
        type: "asset/resource",
        ...options?.rule,
      },
    ],
  },
});

/**
 * Configure webpack-dev-server:
 * https://webpack.js.org/configuration/dev-server
 *
 * Tested with: webpack-dev-server@^5.0.4
 *
 * @param {Object} [options] Options for webpack-dev-server. (https://webpack.js.org/configuration/dev-server/#devserver)
 * @returns {Object} A webpack configuration object that sets up webpack-dev-server.
 */
exports.setupDevServer = (options) => ({
  devServer: {
    ...options,
  },
});
