module.exports = (api) => {
    const presetEnv = [
        '@babel/preset-env',
        { browserslistEnv: 'backend', modules: false },
    ]
    const presetReact = [
        '@babel/preset-react',
        {
            development: true,
            runtime: 'automatic',
        },
    ]

    if (api.env('production')) {
        delete presetReact[1].development
    }

    return {
        presets: [presetEnv, presetReact, '@babel/preset-typescript'],
    }
}
