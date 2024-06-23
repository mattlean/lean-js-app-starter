module.exports = (api) => {
    const presetEnv = ['@babel/preset-env', { modules: false }]

    if (api.env('test')) {
        delete presetEnv[1].modules
    }

    return {
        presets: [presetEnv, '@babel/preset-typescript'],
    }
}
