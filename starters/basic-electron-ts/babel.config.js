module.exports = (api) => {
    const isProduction = api.env('production')
    const isTest = api.env('test')

    api.cache.using(() => {
        if (isProduction) {
            return 'production'
        } else if (isTest) {
            return 'test'
        } else {
            return 'development'
        }
    })

    /**
     * Configuration for preset-env:
     * https://babeljs.io/docs/babel-preset-env
     */
    const presetEnv = ['@babel/preset-env', { modules: false }]

    /**
     * Configuration for preset-typescript:
     * https://babeljs.io/docs/babel-preset-typescript
     */
    const presetTs = '@babel/preset-typescript'

    return {
        presets: [presetEnv, presetTs],
    }
}
