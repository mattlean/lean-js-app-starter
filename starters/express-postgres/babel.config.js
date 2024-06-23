module.exports = (api) => {
    const isTest = api.env('test')

    /**
     * Configuration for preset-env:
     * https://babeljs.io/docs/babel-preset-env
     */
    const presetEnv = ['@babel/preset-env', { modules: false }]

    if (isTest) {
        delete presetEnv[1].modules
    }

    return {
        presets: [presetEnv],
    }
}
