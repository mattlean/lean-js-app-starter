const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')

const templateParameters = require('./templateParameters')
const { PATH_FRONTEND_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: { app: `${PATH_FRONTEND_SRC}/index.jsx` },

        output: {
            clean: true,
            publicPath: '/',
        },
    },

    // Build EJS templates with injected assets for Express views
    buildHtml({
        // TODO: remove the comments below
        filename: '../generated-views/index.ejs',
        // template: 'src/frontend/index.ejs?raw',
        template: '!!raw-loader!src/frontend/index.ejs',
        // template: 'src/frontend/index.ejs',
        templateParameters,
    }),
])
