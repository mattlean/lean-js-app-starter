module.exports = (api) => {
    const presetEnv = ['@babel/preset-env', { browserslistEnv: 'development' }]
    const presetReact = [
        '@babel/preset-react',
        { development: true, runtime: 'automatic' },
    ]
    const plugins = []

    if (api.env('production')) {
        presetEnv[1].browserslistEnv = 'production'
        delete presetReact[1].development
    }

    if (api.env('development')) {
        plugins.push(require.resolve('react-refresh/babel'))
    }

    if (!api.env('test')) {
        presetEnv[1].modules = false
    }

    return {
        presets: [presetEnv, presetReact],
        plugins,
    }
}
