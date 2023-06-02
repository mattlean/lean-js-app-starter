const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const { compileReact } = require('ljas-webpack')

const config = merge([
    {
        entry: './src/main.js',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },

        plugins: [new HtmlWebpackPlugin({ title: 'LJAS: React Frontend' })],
    },

    compileReact({ include: path.resolve(__dirname, 'src') }),
])

module.exports = config
