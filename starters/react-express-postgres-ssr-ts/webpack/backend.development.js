const { buildSourceMaps, watchIgnore } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_BACKEND_BUILD_DEV } = require('../PATHS')

module.exports = merge([
    {
        output: { path: PATH_BACKEND_BUILD_DEV },
    },

    buildSourceMaps('cheap-module-source-map'),

    watchIgnore(/node_modules/),
])
