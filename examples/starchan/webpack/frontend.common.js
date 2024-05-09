require('dotenv').config()

const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')
const { EnvironmentPlugin } = require('webpack')

const templateParameters = require('./templateParameters')
const { PATH_FRONTEND_SRC } = require('../PATHS')

if ((process.env.E2E && !process.env.HOST_E2E) || !process.env.HOST) {
    throw new Error('Host was not set')
}

module.exports = merge([
    {
        entry: { app: `${PATH_FRONTEND_SRC}/index.tsx` },

        output: {
            clean: true,
            publicPath: '/',
        },

        plugins: [
            new EnvironmentPlugin({
                E2E: process.env.E2E || false,
                HOST: process.env.HOST,
                HOST_E2E: process.env.HOST_E2E || '',
            }),
        ],
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
