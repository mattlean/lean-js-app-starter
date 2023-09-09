const buildHtml = require('ljas-webpack/buildHtml')
const path = require('path')
const { merge } = require('webpack-merge')

const templateParams = require('./templateParams')

module.exports = merge([
    {
        entry: './src/frontend/index.tsx',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, '../build/frontend/public'),
            publicPath: '/static',
        },
    },

    // Generate EJS templates with injected assets for Express views
    buildHtml({
        filename: '../generated-views/index.ejs',
        // template: 'src/frontend/index.ejs?raw',
        template: '!!raw-loader!src/frontend/index.ejs',
        // template: 'src/frontend/index.ejs',
        templateParameters: templateParams,
    }),
])
