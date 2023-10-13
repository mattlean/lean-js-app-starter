const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            const config = merge(commonConfig, productionConfig)
            const productionConfig = require('./webpack.production')
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return config
        }

        case 'development': {
            const config = merge(commonConfig, developmentConfig)
            const developmentConfig = require('./webpack.development')
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return config
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
