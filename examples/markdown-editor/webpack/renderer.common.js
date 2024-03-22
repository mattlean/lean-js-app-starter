const buildHtml = require('ljas-webpack/buildHtml')
const { merge } = require('webpack-merge')

const { PATH_RENDERER_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: {
            colormode: `${PATH_RENDERER_SRC}/colorMode.ts`,
            renderer: `${PATH_RENDERER_SRC}/index.tsx`,
        },
    },

    buildHtml({
        title: 'ljas-markdown-editor',
        template: 'src/renderer/index.ejs',
    }),
])
