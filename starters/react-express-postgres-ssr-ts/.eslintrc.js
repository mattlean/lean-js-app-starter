const RULES_REACT = {
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
            files: ['prisma/**/*.[jt]s', 'src/**/*.[jt]s'],
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
                es2024: true,
                node: true,
            },
            files: ['src/common/**/*.[jt]s?(x)'],
            ...CONFIG_REACT_TS,
        },

        /* Frontend Source */
        {
            env: {
                browser: true,
                es2024: true,
            },
            files: ['src/frontend/**/*.[jt]s?(x)'],
            ...CONFIG_REACT_TS,
        },

        /* Jest */
        {
            env: {
                es2024: true,
                jest: true,
                node: true,
            },
            files: [
                'prisma/singleton.ts',
                'src/**/__mocks__/**/*.[jt]s?(x)',
                'src/**/__tests__/**/*.[jt]s?(x)',
                'src/**/?(*.)+(spec|test).[jt]s?(x)',
                'src/common/msw/**/*.[jt]s',
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
            plugins: ['@typescript-eslint'],
            rules: RULES_REACT,
        },

        /* Playwright */
        {
            env: {
                browser: true,
                es2024: true,
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
    settings: {
        react: {
            version: '18.2',
        },
    },
}
