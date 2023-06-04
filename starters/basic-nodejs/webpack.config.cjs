const { compileJs } = require('ljas-webpack')
const path = require('path')
const { merge } = require('webpack-merge')

module.exports = merge([
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
        rule: {
            include: path.resolve(__dirname, 'src'),
            // This is needed to get around the explicit file extension requirement for imports when
            // dealing with ECMAScript modules in Node.js.
            resolve: { fullySpecified: false },
        },
    }),
])
