const { merge } = require('webpack-merge')
const buildCommonConfig = require('./webpack.common')
const buildDevelopmentConfig = require('./webpack.development')

module.exports = (env, { mode }) => {
    const commonConfig = buildCommonConfig(mode)
    const developmentConfig = buildDevelopmentConfig(mode)

    switch (mode) {
        case 'production': {
            const config = merge(commonConfig, developmentConfig, { mode })
            console.log('PROD CONFIG', config, JSON.stringify(config))
            return config
        }

        case 'development': {
            const config = merge(commonConfig, developmentConfig, { mode })
            console.log('DEV CONFIG', config, JSON.stringify(config))
            return config
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
