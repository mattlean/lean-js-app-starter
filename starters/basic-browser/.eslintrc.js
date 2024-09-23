module.exports = {
    env: {
        es2024: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Source */
        {
            env: {
                browser: true,
                es2024: true,
            },
            files: ['src/**/*.js'],
        },

        /* Jest */
        {
            env: {
                es2024: true,
                jest: true,
                node: true,
            },
            files: [
                'src/**/__mocks__/**/*.js',
                'src/**/__tests__/**/*.js',
                'src/**/?(*.)+(spec|test).js',
                'src/msw/**/*.js',
            ],
            extends: [
                'eslint:recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
        },

        /* Playwright */
        {
            env: {
                browser: true,
                es2024: true,
                node: true,
            },
            files: 'src/playwright/**/*.js',
            extends: [
                'eslint:recommended',
                'plugin:playwright/recommended',
                'prettier',
            ],
        },
    ],
}
