require('dotenv').config()
const { merge } = require('webpack-merge')

const commonConfig = require('./renderer.common')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            return merge(commonConfig, require('./renderer.production'))
        }

        case 'development': {
            return merge(commonConfig, require('./renderer.development'))
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
