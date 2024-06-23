module.exports = (api) => {
    const presetEnv = [
        '@babel/preset-env',
        { browserslistEnv: 'frontend-development', modules: false },
    ]
    const presetReact = [
        '@babel/preset-react',
        {
            development: true,
            runtime: 'automatic',
        },
    ]
    const plugins = []

    if (api.env('production')) {
        presetEnv[1].browserslistEnv = 'frontend-production'
        delete presetReact[1].development
    }

    if (api.env('development')) {
        plugins.push(require.resolve('react-refresh/babel'))
    }

    return {
        presets: [presetEnv, presetReact, '@babel/preset-typescript'],
        plugins,
    }
}
