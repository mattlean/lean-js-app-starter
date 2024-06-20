module.exports = {
    presets: [
        ['@babel/preset-env', { modules: false }],
        [
            '@babel/preset-react',
            {
                development: true,
                runtime: 'automatic',
            },
        ],
    ],
}
