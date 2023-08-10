const { merge } = require('webpack-merge')
const buildCommonConfig = require('./frontend.common')
const developmentConfig = require('./frontend.development')
const productionConfig = require('./frontend.production')

module.exports = (env, { mode }) => {
    const commonConfig = buildCommonConfig(mode)

    switch (mode) {
        case 'production': {
            const config = merge(commonConfig, productionConfig)
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return config
        }

        case 'development': {
            const config = merge(commonConfig, developmentConfig)
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return config
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
