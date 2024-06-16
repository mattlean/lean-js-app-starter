module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['build/', 'coverage/', 'dist/', 'playwright-report/'],
    parserOptions: {
        ecmaVersion: '2021',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Preload Source */
        {
            env: {
                browser: true,
                es2021: true,
                node: true,
            },
            files: ['src/**/*.js'],
        },

        /* Renderer Source */
        {
            env: {
                browser: true,
                es2021: true,
            },
            files: ['src/**/*.js'],
        },

        /* Jest */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: [
                'src/**/__mocks__/**/*.js',
                'src/**/__tests__/**/*.js',
                'src/**/?(*.)+(spec|test).js',
                'src/renderer/msw/**/*.js',
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
                es2021: true,
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
