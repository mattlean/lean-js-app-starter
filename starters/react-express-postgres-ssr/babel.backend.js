module.exports = (api) => {
    const isProduction = api.env('production')
    const isTest = api.env('test')

    /**
     * Configuration for preset-env:
     * https://babeljs.io/docs/babel-preset-env
     */
    const presetEnv = [
        '@babel/preset-env',
        { browserslistEnv: 'backend', modules: false },
    ]

    /**
     * Configuration for preset-react:
     * https://babeljs.io/docs/babel-preset-react
     */
    const presetReact = [
        '@babel/preset-react',
        {
            development: true,
            runtime: 'automatic',
        },
    ]

    if (isProduction) {
        delete presetReact[1].development
    }

    if (isTest) {
        delete presetEnv[1].modules
    }

    return {
        presets: [presetEnv, presetReact],
    }
}
