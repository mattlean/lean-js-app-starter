const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')
const { EnvironmentPlugin } = require('webpack')

const templateParameters = require('./templateParameters')

module.exports = merge([
    {
        entry: { app: './src/frontend/index.tsx' },
        plugins: [new EnvironmentPlugin({ __EXPRESS_SERVER__: '' })],
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
