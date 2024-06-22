module.exports = {
    presets: [
        [
            '@babel/preset-env',
            { browserslistEnv: 'frontend-production', modules: false },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
    ],
}
