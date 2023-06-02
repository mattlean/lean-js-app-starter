module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    overrides: [
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
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    root: true,
    rules: {},
}
