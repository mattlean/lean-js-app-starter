const buildHtml = require('ljas-webpack/buildHtml')
const path = require('path')
const { compileReact } = require('ljas-webpack')
const { merge } = require('webpack-merge')

module.exports = merge([
    {
        entry: './src/main.js',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },
    },

    compileReact({ include: path.resolve(__dirname, 'src') }),

    buildHtml({ title: 'ljas-react-frontend' }),
])
