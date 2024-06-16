module.exports = {
    env: {
        es2020: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['build/', 'coverage/', 'playwright-report/'],
    parserOptions: {
        ecmaVersion: '2020',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Source */
        {
            env: {
                browser: true,
                es2020: true,
            },
            files: ['src/**/*.js'],
        },

        /* Jest */
        {
            env: {
                es2020: true,
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
                es2020: true,
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
