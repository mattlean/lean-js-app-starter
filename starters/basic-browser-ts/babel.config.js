module.exports = (api) => {
    const presetEnv = [
        '@babel/preset-env',
        { browserslistEnv: 'development', modules: false },
    ]

    const plugins = []

    if (api.env('production')) {
        presetEnv[1].browserslistEnv = 'production'
    }

    return {
        presets: [presetEnv, '@babel/preset-typescript'],
        plugins,
    }
}
