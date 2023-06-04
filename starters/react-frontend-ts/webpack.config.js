const { merge } = require('webpack-merge')
const buildCommonConfig = require('./webpack.common')
const developmentConfig = require('./webpack.development')
const productionConfig = require('./webpack.production')

module.exports = (env, { mode }) => {
    const commonConfig = buildCommonConfig(mode)

    switch (mode) {
        case 'production':
            return merge(commonConfig, productionConfig)

        case 'development':
            return merge(commonConfig, developmentConfig)

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
