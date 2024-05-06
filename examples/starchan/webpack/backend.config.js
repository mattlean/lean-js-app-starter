const { merge } = require('webpack-merge')

const commonConfig = require('./backend.common')

module.exports = (env, { mode }) => {
    switch (mode) {
        case 'production': {
            return merge(commonConfig, require('./backend.production'))
        }

        default: {
            return merge(commonConfig, require('./backend.development'))
        }
    }
}
