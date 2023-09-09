const buildHtml = require('ljas-webpack/buildHtml')
const path = require('path')
const { merge } = require('webpack-merge')

module.exports = merge([
    {
        entry: './src/index.jsx',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },
    },

    buildHtml({ title: 'ljas-react-frontend' }),
])
