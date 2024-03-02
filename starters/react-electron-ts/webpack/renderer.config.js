const { merge } = require('webpack-merge')

const commonConfig = require('./renderer.common')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            const productionConfig = require('./renderer.production')
            return merge(commonConfig, productionConfig)
        }

        case 'development': {
            const developmentConfig = require('./renderer.development')
            return merge(commonConfig, developmentConfig)
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
