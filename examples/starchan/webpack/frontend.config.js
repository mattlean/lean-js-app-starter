const { merge } = require('webpack-merge')

const commonConfig = require('./frontend.common')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            return merge(commonConfig, require('./frontend.production'))
        }

        case 'development': {
            return merge(commonConfig, require('./frontend.development'))
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
