const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')

module.exports = merge([
    {
        entry: {
            app: './src/index.tsx',
        },

        module: {
            rules: [
                // Used to get around CSP issue that blocks data: URIs for SVGs
                // More info: https://getbootstrap.com/docs/5.3/getting-started/webpack/#extracting-svg-files
                {
                    mimetype: 'image/svg+xml',
                    scheme: 'data',
                    type: 'asset/resource',
                    generator: {
                        filename: 'icons/[hash].svg',
                    },
                },
            ],
        },
    },

    buildHtml({ title: 'ljas-counter' }),
])
