module.exports = {
    presets: [
        '@babel/preset-env',
        [
            '@babel/preset-react',
            {
                development: true,
                runtime: 'automatic',
            },
        ],
    ],
}
