const compileTs = require('ljas-webpack/compileTs')
const path = require('path')
const { merge } = require('webpack-merge')

const config = merge([
    {
        entry: './src/main.ts',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },

        target: 'node18.16',
    },

    compileTs({ rule: { include: path.resolve(__dirname, 'src') } }),
])

console.log('DEBUG CONFIG', config.module, JSON.stringify(config))

module.exports = config
