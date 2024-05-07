const RULES_REACT = {
    // This requires code utilizing JSX to be within a .jsx file.
    // This is to be consistent with TypeScript where it requires
    // all code utilizing JSX to be within a .tsx file.
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
}

const CONFIG_REACT_TS = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: RULES_REACT,
}

module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['build/', 'coverage/', 'playwright-report/'],
    parserOptions: {
        ecmaVersion: '2021',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Source */
        {
            files: ['src/**/*.[jt]s'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
        },

        /* Backend Source */
        {
            files: ['src/backend/**/*.[jt]s?(x)'],
            ...CONFIG_REACT_TS,
        },

        /* Common Source */
        {
            env: {
                browser: true,
                es2021: true,
                node: true,
            },
            files: ['src/common/**/*.[jt]s?(x)'],
            ...CONFIG_REACT_TS,
        },

        /* Frontend Source */
        {
            env: {
                browser: true,
                es2021: true,
            },
            files: ['src/frontend/**/*.[jt]s?(x)'],
            ...CONFIG_REACT_TS,
        },

        /* Prisma & Dev Scripts */
        {
            files: ['dev-scripts/**/*.[jt]s', 'prisma/**/*.[jt]s'],
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
                es2021: true,
                jest: true,
                node: true,
            },
            files: [
                'prisma/singleton.ts',
                'src/**/__mocks__/**/*.[jt]s?(x)',
                'src/**/__tests__/**/*.[jt]s?(x)',
                'src/**/?(*.)+(spec|test).[jt]s?(x)',
            ],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'jest'],
            rules: RULES_REACT,
        },

        /* Playwright */
        {
            env: {
                es2021: true,
                node: true,
            },
            files: 'src/playwright/**',
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:playwright/recommended',
                'prettier',
            ],
        },
    ],
    settings: {
        react: {
            version: '18.2',
        },
    },
}
