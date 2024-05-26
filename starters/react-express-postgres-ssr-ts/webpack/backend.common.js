const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const { PATH_BACKEND_SRC } = require('../PATHS')

module.exports = merge([
    {
        entry: { server: `${PATH_BACKEND_SRC}/index.ts` },

        output: {
            clean: true,
            filename: '[name].js',
        },

        target: 'node',
    },

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])
