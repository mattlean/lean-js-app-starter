module.exports = {
    presets: [
        ['@babel/preset-env', { browserslistEnv: 'backend', modules: false }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
    ],
}
