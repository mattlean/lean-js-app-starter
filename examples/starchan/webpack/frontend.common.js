const buildHtml = require('ljas-webpack/buildHtml')
const { injectCss } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const templateParams = require('./templateParams')
const { PATH_FRONTEND_SRC } = require('../PATHS')

module.exports = merge([
    { entry: { app: './src/frontend/index.tsx' } },

    injectCss({ rule: { include: PATH_FRONTEND_SRC } }),

    // Generate EJS templates with injected assets for Express views
    buildHtml({
        // TODO: remove the comments below
        filename: '../generated-views/index.ejs',
        // template: 'src/frontend/index.ejs?raw',
        template: '!!raw-loader!src/frontend/index.ejs',
        // template: 'src/frontend/index.ejs',
        templateParameters: templateParams,
    }),
])
