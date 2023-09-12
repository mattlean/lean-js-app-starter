const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')
const { PATH_FRONTEND_BUILD } = require('../PATHS')

const templateParams = require('./templateParams')

module.exports = merge([
    {
        entry: './src/frontend/index.tsx',

        output: {
            clean: true,
            filename: 'app.js',
            path: `${PATH_FRONTEND_BUILD}/public`,
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
