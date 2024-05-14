const RULES_REACT = {
    // This requires code utilizing JSX to be within a .jsx file.
    // This is to be consistent with TypeScript where it requires
    // all code utilizing JSX to be within a .tsx file.
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
}

module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['build/', 'coverage/'],
    parserOptions: {
        ecmaVersion: '2021',
        sourceType: 'module',
    },
    root: true,
    rules: {},
    overrides: [
        /* Source */
        {
            env: {
                browser: true,
                es2021: true,
            },
            files: ['src/**/*.[jt]s?(x)'],
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
        },

        /* Jest */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: [
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
    ],
    settings: {
        react: {
            version: '18.2',
        },
    },
}
