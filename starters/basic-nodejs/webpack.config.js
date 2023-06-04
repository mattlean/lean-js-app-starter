const { compileJs } = require('ljas-webpack')
const path = require('path')
const { merge } = require('webpack-merge')

const config = merge([
    {
        entry: './src/main.js',

        output: {
            clean: true,
            filename: 'app.js',
            path: path.resolve(__dirname, 'build'),
        },

        target: 'node18.16',
    },

    compileJs({
        rule: { include: path.resolve(__dirname, 'src') },
    }),
])

console.log('DEBUG CONFIG', config, JSON.stringify(config))

module.exports = config
