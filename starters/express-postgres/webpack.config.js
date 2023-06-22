const { compileJs } = require('ljas-webpack')
const path = require('path')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const config = merge([
    {
        entry: './src/index.js',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },

        target: 'node18.16',
    },

    compileJs({
        rule: {
            include: path.resolve(__dirname, 'src'),
            exclude: [
                /node_modules/,
                /__mocks__\/.*.js$/,
                /__tests__\/.*.js$/,
                /\.(spec|test)\.js$/,
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
