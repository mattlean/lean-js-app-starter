const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const developmentConfig = require('./webpack.development')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production':
            return merge(commonConfig, developmentConfig, { mode })

        case 'development':
            return merge(commonConfig, developmentConfig, { mode })

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
