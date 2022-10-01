/**
 * ljas-webpack
 *
 * This build was tested with:
 * - webpack@^5.74.0
 * - webpack-cli@^4.10.0
 * - webpack-merge@^5.8.0
 */

/**
 * Compile React TypeScript files with Babel:
 * https://webpack.js.org/loaders/babel-loader
 *
 * Note that this does not perform type checking since that is handled by checkTypes().
 *
 * Peer dependencies:
 * - @babel/core@^7.19.1
 * - @babel/preset-env@^7.19.1
 * - @babel/preset-react@^7.18.6
 * - @babel/preset-typescript@^7.18.6
 * - babel-loader@^8.2.5
 * - typescript@^4.8.3
 */
exports.compileReact = (include) => ({
  module: {
    rules: [
      {
        test: /(\.j|t)sx?$/,
        include,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
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
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
})

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
 */
exports.compileTS = (include) => ({
  module: {
    rules: [
      {
        test: /(\.j|t)s$/,
        include,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
})

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
 */
exports.inlineCSS = () => ({
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
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
