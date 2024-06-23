module.exports = () => {
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
