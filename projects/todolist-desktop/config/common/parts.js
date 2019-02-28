const CleanWebpackPlugin = require('clean-webpack-plugin')
const cssnano = require('cssnano')
const FlowWebpackPlugin = require('flow-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const PATHS = require('../../PATHS')

// Load files
const loadFiles = ({ exclude, include, options, test, type } = {}) => {
  if(type === 'url' || type === undefined) {
    return {
      module: {
        rules: [
          {
            use: {
              loader: 'url-loader',
              options
            },
            exclude,
            include,
            test
          }
        ]
      }
    }
  } else if(type === 'file') {
    return {
      module: {
        rules: [
          {
            use: {
              loader: 'file-loader',
              options
            },
            test
          }
        ]
      }
    }
  }
}

// Autoprefix CSS
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: { plugins: () => [require('autoprefixer')()] }
})

// Run Flow type checking
exports.checkTypes = () => ({
  plugins: [new FlowWebpackPlugin()]
})

// Clean paths
exports.cleanPaths = paths => ({
  plugins: [new CleanWebpackPlugin(
    paths,
    { root: PATHS.root }
  )]
})

// Extract styles into its own CSS file
exports.extractStyles = ({ exclude, filename, include, use = [] }) => {
  const plugin = new MiniCssExtractPlugin({ filename })

  return {
    module: {
      rules: [
        {
          use: [MiniCssExtractPlugin.loader].concat(use),
          exclude,
          include,
          test: /\.(css|scss)$/
        }
      ]
    },
    plugins: [plugin]
  }
}

// Create source maps
exports.genSourceMaps = ({ type }) => ({ devtool: type })

// Load fonts
exports.loadFonts = ({ exclude, include, options, type } = {}) => loadFiles({
  exclude,
  include,
  options,
  test: /\.(eot|ttf|woff|woff2)$/,
  type
})

// Load HTML
exports.loadHTML = options => ({
  plugins: [ new HtmlWebpackPlugin(options) ]
})

// Load images
exports.loadImgs = ({ exclude, include, options, type } = {}) => loadFiles({
  exclude,
  include,
  options,
  test: /\.(gif|jpe?g|png)$/i,
  type
})

// Load JavaScript through Babel
exports.loadJS = ({ exclude, include } = {}) => ({
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude,
        include,
        test: /\.jsx?$/
      }
    ]
  }
})

// Setup styles
exports.loadStyles = ({ exclude, include } = {}) => ({
  module: {
    rules: [{
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ],
      exclude,
      include,
      test: /\.(css|scss)$/
    }]
  }
})

// Minify CSS
exports.minCSS = ({ options } = {}) => ({
  plugins: [new OptimizeCSSAssetsPlugin({
    canPrint: false,
    cssProcessor: cssnano,
    cssProcessOptions: options
  })]
})

// Minify JavaScript
exports.minJS = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin( { sourceMap: true} )]
  }
})

// Remove unused CSS
exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
})

// Set free variable
exports.setFreeVariable = (key, val) => {
  const env = {}
  env[key] = JSON.stringify(val)

  return { plugins: [new webpack.DefinePlugin(env)] }
}

// Setup webpack-dev-server
exports.setupDevServer = ({ host, historyApiFallback, hot, open, port, proxy } = {}) => ({
  devServer: {
    host,
    port,
    historyApiFallback,
    hot,
    open,
    proxy,
    stats: 'errors-only',
    overlay: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
