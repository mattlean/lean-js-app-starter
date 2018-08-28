const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src')
}

console.log('EYYO', `${PATHS.src}/main.jsx`)

module.exports = {
  entry: './src/main.jsx',

  devServer: {
    host: process.env.HOST,
    open: true,
    overlay: true,
    port: process.env.PORT,
    stats: 'errors-only'
  },

  output: {
    filename: 'script.js',
    path: PATHS.build
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        include: PATHS.src,
        test: /\.jsx?$/
      }
    ]
  },

  plugins: [ new HtmlWebpackPlugin({ template: `${PATHS.src}/index.html` }) ]
}
