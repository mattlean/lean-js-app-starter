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
            files: ['src/**/*.[jt]s'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
        },

        /* Jest */
        {
            env: {
                es2020: true,
                jest: true,
                node: true,
            },
            files: [
                'src/**/__mocks__/**/*.[jt]s',
                'src/**/__tests__/**/*.[jt]s',
                'src/**/?(*.)+(spec|test).[jt]s',
                'src/msw/**/*.[jt]s',
            ],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
        },

        /* Playwright */
        {
            env: {
                browser: true,
                es2020: true,
                node: true,
            },
            files: 'src/playwright/**/*.[jt]s',
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:playwright/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
        },
    ],
}
