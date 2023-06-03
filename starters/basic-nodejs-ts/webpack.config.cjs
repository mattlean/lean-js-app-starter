const compileTs = require('ljas-webpack/compileTs')
const path = require('path')
const { merge } = require('webpack-merge')

module.exports = merge([
    {
        entry: './src/main.ts',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },

        target: 'node18.16',
    },

    compileTs({ include: path.resolve(__dirname, 'src') }),
])
