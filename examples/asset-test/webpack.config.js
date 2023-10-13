const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            const productionConfig = require('./webpack.production')
            const config = merge(commonConfig, productionConfig)
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return config
        }

        case 'development': {
            const developmentConfig = require('./webpack.development')
            const config = merge(commonConfig, developmentConfig)
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return config
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
