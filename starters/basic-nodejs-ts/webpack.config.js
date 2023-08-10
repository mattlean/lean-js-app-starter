const compileTs = require('ljas-webpack/compileTs')
const path = require('path')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const config = merge([
    {
        entry: './src/index.ts',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },

        devtool: 'eval-source-map',

        target: 'node18.16',
    },

    compileTs({
        rule: {
            include: path.resolve(__dirname, 'src'),
            exclude: [
                /node_modules/,
                /__mocks__\/.*.(j|t)s$/,
                /__tests__\/.*.(j|t)s$/,
                /\.(spec|test)\.(j|t)s$/,
            ],
        },
    }),

    setupNodeExternals({
        // TODO: remove this before going to prod
        additionalModuleDirs: ['../../node_modules'],
    }),
])

console.log('DEBUG CONFIG', config.module, JSON.stringify(config))

module.exports = config
