module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: '2021',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Tests */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: ['src/**/*.test.js'],
            extends: [
                'eslint:recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            plugins: ['jest'],
        },
    ],
}
