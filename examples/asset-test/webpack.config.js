const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const developmentConfig = require('./webpack.development')
const productionConfig = require('./webpack.production')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            const config = merge(commonConfig, productionConfig)
            console.log('DEBUG CONFIG', config, JSON.stringify(config))
            return config
        }

        case 'development': {
            const config = merge(commonConfig, developmentConfig)
            console.log(
                'DEBUG CONFIG',
                config,
                JSON.stringify(config),
                config.module.rules[1]
            )
            return config
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
