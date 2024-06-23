module.exports = () => {
    const presetEnv = ['@babel/preset-env', { modules: false }]

    return {
        presets: [presetEnv, '@babel/preset-typescript'],
    }
}
