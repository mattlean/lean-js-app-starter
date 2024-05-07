const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')

const { PATH_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: { app: `${PATH_SRC}/index.tsx` },

        output: { clean: true },

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
