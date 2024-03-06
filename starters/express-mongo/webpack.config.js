const setupNodeExternals = require('ljas-webpack/setupNodeExternals')
const { buildSourceMaps, compileJs } = require('ljas-webpack')
const { merge } = require('webpack-merge')
const { PATH_BUILD, PATH_SRC } = require('./PATHS')

const config = merge([
    {
        entry: { server: './src/index.js' },

        output: {
            clean: true,
            filename: '[name].js',
            path: PATH_BUILD,
        },

        target: 'node',
    },

    compileJs({
        rule: {
            include: PATH_SRC,
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
            const configProd = merge(config, buildSourceMaps('source-map'))
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return configProd
        }

        default: {
            const configDev = merge(
                config,
                buildSourceMaps('cheap-module-source-map'),
            )
            console.log('DEBUG CONFIG', configDev, JSON.stringify(configDev))
            return configDev
        }
    }
}
