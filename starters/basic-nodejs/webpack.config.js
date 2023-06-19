const { compileJs } = require('ljas-webpack')
const path = require('path')
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
])

console.log('DEBUG CONFIG', config, JSON.stringify(config))

module.exports = config
