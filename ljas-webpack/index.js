/**
 * ljas-webpack
 *
 * This build was tested with:
 * - webpack@^5.74.0
 * - webpack-cli@^4.10.0
 * - webpack-merge@^5.8.0
 */
const { REACT_EXTENSIONS, VANILLA_EXTENSIONS } = require('./consts')

/**
 * Compile TypeScript files with Babel:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Note that this does not perform type checking since that is handled by checkTypes().
 *
 * Peer dependencies:
 * - @babel/core@^7.19.1
 * - @babel/preset-env@^7.19.1
 * - @babel/preset-typescript@^7.18.6
 * - babel-loader@^8.2.5
 * - typescript@^4.8.3
 *
 * Additional peer dependency if supportReact flag is enabled: @babel/preset-react@^7.18.6
 *
 * @param {Object} [options] The options object that controls the output of this function.
 * @param {Object} [options.babelLoader] Options for babel-loader. This will override the default options set for babel-loader when defined. (https://webpack.js.org/loaders/babel-loader/#options)
 * @param {Array|Function|Object|RegExp|string} [options.exclude=/node_modules/] webpack exclude rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {Array|Function|Object|RegExp|string} [options.include] webpack include rule. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {boolean} [options.sideEffects] webpack sideEffects rule. (https://webpack.js.org/configuration/module/#rulesideeffects)
 * @param {boolean} [options.supportReact] Enable React support. The babelLoader option will override this if it is defined.
 */
exports.compileTS = (options) => {
  let babelLoaderOptions
  if (options?.babelLoader) {
    babelLoaderOptions = options.babelLoader
  } else if (options?.supportReact) {
    babelLoaderOptions = {
      presets: [
        '@babel/preset-env',
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
        '@babel/preset-typescript',
      ],
    }
  } else {
    babelLoaderOptions = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
    }
  }

  return {
    module: {
      rules: [
        {
          test: options?.supportReact ? /(\.j|t)sx?$/ : /(\.j|t)s$/,
          exclude: options?.exclude || /node_modules/,
          include: options?.include,
          sideEffects: options?.sideEffects,
          use: {
            loader: 'babel-loader',
            options: babelLoaderOptions,
          },
        },
      ],
    },
    resolve: {
      extensions: options?.supportReact ? REACT_EXTENSIONS : VANILLA_EXTENSIONS,
    },
  }
}

/**
 * Run the develoment server with webpack-dev-server:
 * https://webpack.js.org/configuration/dev-server
 *
 * Peer dependency: webpack-dev-server@^4.11.0
 *
 * @param {boolean|string|Object} static webpack-dev-server static option (https://webpack.js.org/configuration/dev-server/#devserverstatic)
 */
exports.setupDevServer = (staticOption) => ({
  devServer: { static: staticOption },
})

/**
 * Generate source maps.
 * The type of source maps generated will differe depending on the mode.
 * For production mode, building them will be slow, but the mapping quality will be high.
 * For development mode, building source maps will usually be fast, but there will be lower mapping quality.
 *
 * For more information:
 * https://webpack.js.org/configuration/devtool
 *
 * @param {string} mode webpack mode (https://webpack.js.org/configuration/mode)
 */
exports.genSourceMaps = (mode) => {
  const config = {}

  if (mode === 'production') {
    config.devtool = 'source-map'
  } else {
    if (mode !== 'development') {
      console.warn(
        'Encountered an unsupported mode. Falling back to development source maps.'
      )
    }

    config.devtool = 'eval-cheap-module-source-map'
  }

  return config
}

/**
 * Inject CSS through a style element.
 *
 * Peer dependencies:
 * - css-loader@^6.7.1
 * - style-loader@^3.3.1
 *
 * @param {Object} [options] The options object that controls the output of this function.
 * @param {Object} [options.cssLoader] Options for css-loader. (https://webpack.js.org/loaders/css-loader/#options)
 * @param {Array|Function|Object|RegExp|string} [options.exclude=/node_modules/] webpack exclude rule. (https://webpack.js.org/configuration/module/#ruleexclude)
 * @param {Array|Function|Object|RegExp|string} [options.include] webpack include rule. (https://webpack.js.org/configuration/module/#ruleinclude)
 * @param {boolean} [options.sideEffects] webpack sideEffects rule. (https://webpack.js.org/configuration/module/#rulesideeffects)
 * @param {Object} [options.styleLoader] Options for style-loader. (https://webpack.js.org/loaders/style-loader/#options)
 */
exports.inlineCSS = (options) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: options?.exclude,
        include: options?.include,
        sideEffects: options?.sideEffects,
        use: [
          { loader: 'style-loader', options: options?.styleLoader },
          { loader: 'css-loader', options: options?.cssLoader },
        ],
      },
    ],
  },
})

/**
 * Set webpack's mode.
 *
 * For more information:
 * https://webpack.js.org/configuration/mode
 *
 * @param {('development'|'none'|'production')} mode webpack mode (https://webpack.js.org/configuration/mode)
 */
exports.setMode = (mode) => ({
  mode,
})

/**
 * Configure webpack's output and target.
 * Hashes will only be included in file names for production mode for browser-based targets.
 *
 * For more information:
 * - https://webpack.js.org/configuration/output
 * - https://webpack.js.org/configuration/target
 *
 * @param {string} mode webpack mode (https://webpack.js.org/configuration/mode)
 * @param {string} path Directory path to output build in
 * @param {string} [target] webpack target (https://webpack.js.org/configuration/target)
 */
exports.setOutput = (mode, path, target) => {
  const config = {
    output: {
      clean: true,
      path,
    },
    target,
  }

  if (mode === 'production' && !target?.includes('node')) {
    config.output.chunkFilename = '[name].[contenthash].js'
    config.output.filename = '[name].[contenthash].js'
    config.output.assetModuleFilename = '[name].[contenthash][ext][query]'
  } else {
    if (mode !== 'production' && mode !== 'development') {
      console.warn(
        'Encountered an unsupported mode. Falling back to development output settings.'
      )
    }

    config.output.filename = '[name].js'
  }

  return config
}
