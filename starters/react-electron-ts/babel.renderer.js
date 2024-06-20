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
        '@babel/preset-typescript',
    ],
    plugins: [require.resolve('react-refresh/babel')],
}
