const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')
const { PATH_BUILD } = require('./PATHS')

module.exports = merge([
    {
        entry: './src/index.tsx',

        output: {
            clean: true,
            filename: 'app.js',
            path: PATH_BUILD,
        },
    },

    buildHtml({ title: 'ljas-react-frontend-ts' }),
])
