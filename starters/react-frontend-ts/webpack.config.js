const { merge } = require('webpack-merge')
const buildCommonConfig = require('./webpack.common')
const developmentConfig = require('./webpack.development')
const productionConfig = require('./webpack.production')

module.exports = (env, { mode }) => {
    const commonConfig = buildCommonConfig(mode)

    switch (mode) {
        case 'production': {
            const config = merge(commonConfig, productionConfig)
            console.log('PROD CONFIG', config, JSON.stringify(config))
            return config
        }

        case 'development': {
            const config = merge(commonConfig, developmentConfig)
            console.log('DEV CONFIG', config, JSON.stringify(config))
            return config
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
