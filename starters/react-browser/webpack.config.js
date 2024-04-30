const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            return merge(commonConfig, require('./webpack.production'))
        }

        case 'development': {
            return merge(commonConfig, require('./webpack.development'))
        }

        default:
            throw new Error(`Unknown mode encountered: ${mode}`)
    }
}
