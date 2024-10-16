/**
 * This Babel config is only used for transforming dependencies used by unified
 * that utilize ESM. That means altering this file will only change how Jest handles
 * a subset of code. All other code is handled with ts-jest which can be configured
 * in jest.config.js.
 */

module.exports = (api) => {
    api.cache(true)

    /**
     * Configuration for preset-env:
     * https://babeljs.io/docs/babel-preset-env
     */
    const presetEnv = '@babel/preset-env'

    /**
     * Configuration for preset-react:
     * https://babeljs.io/docs/babel-preset-react
     */
    const presetReact = [
        '@babel/preset-react',
        { development: true, runtime: 'automatic' },
    ]

    return {
        presets: [presetEnv, presetReact],
    }
}
