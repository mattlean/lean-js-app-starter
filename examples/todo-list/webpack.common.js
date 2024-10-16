const buildHtml = require('ljas-webpack/buildHtml')
const { compileReact } = require('ljas-webpack')
const { merge } = require('webpack-merge')

const { PATH_ROOT, PATH_SRC } = require('./PATHS')

module.exports = merge([
    {
        entry: { app: `${PATH_SRC}/index.jsx` },

        output: { clean: true },
    },

    buildHtml({ title: 'ljas-todo-list' }),

    compileReact({
        rule: {
            include: PATH_SRC,
            exclude: [
                /node_modules/,
                /__mocks__\/.*.jsx?$/,
                /__tests__\/.*.jsx?$/,
                /\.(spec|test)\.jsx?$/,
            ],
        },
        babelLoader: {
            cacheDirectory: true,
            configFile: `${PATH_ROOT}/babel.config.js`,
        },
    }),
])
