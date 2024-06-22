module.exports = {
    presets: [
        ['@babel/preset-env', { browserslistEnv: 'backend', modules: false }],
        [
            '@babel/preset-react',
            {
                development: true,
                runtime: 'automatic',
            },
        ],
        '@babel/preset-typescript',
    ],
}
