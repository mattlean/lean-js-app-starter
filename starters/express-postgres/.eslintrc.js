module.exports = {
    env: {
        es2020: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: '2020',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Jest */
        {
            env: {
                es2020: true,
                jest: true,
                node: true,
            },
            files: [
                'prisma/singleton.js',
                'src/**/__mocks__/**/*.js',
                'src/**/__tests__/**/*.js',
                'src/**/?(*.)+(spec|test).js',
            ],
            extends: [
                'eslint:recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
        },
    ],
}
