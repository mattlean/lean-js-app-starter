const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const { compileReact } = require('ljas-webpack')

module.exports = merge([
    {
        entry: './src/main.js',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },

        plugins: [new HtmlWebpackPlugin({ title: 'ljas-react-frontend' })],
    },

    compileReact({ include: path.resolve(__dirname, 'src') }),
])
