const { compileJs } = require('ljas-webpack')
const path = require('path')
const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { merge } = require('webpack-merge')

const config = merge([
    {
        entry: './src/index.js',

        output: {
            clean: true,
            filename: 'server.js',
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

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            const configProd = merge(config, { devtool: 'source-map' })
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return configProd
        }

        default: {
            const configDev = merge(config, {
                devtool: 'eval-source-map',
            })
            console.log('DEBUG CONFIG', configDev, JSON.stringify(configDev))
            return configDev
        }
    }
}

module.exports = config
