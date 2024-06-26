const RULES_REACT = {
    // This requires code utilizing JSX to be within a .jsx file.
    // This is to be consistent with TypeScript where it requires
    // all code utilizing JSX to be within a .tsx file.
    'react/jsx-filename-extension': 'error',
}

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
        /* Source */
        {
            env: {
                browser: true,
                es2020: true,
            },
            files: ['src/**/*.js?(x)'],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'prettier',
            ],
            rules: RULES_REACT,
        },

        /* Jest */
        {
            env: {
                es2020: true,
                jest: true,
                node: true,
            },
            files: [
                'src/**/__mocks__/**/*.js?(x)',
                'src/**/__tests__/**/*.js?(x)',
                'src/**/?(*.)+(spec|test).js?(x)',
                'src/msw/**/*.js',
            ],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            rules: RULES_REACT,
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
    settings: {
        react: {
            version: '18.2',
        },
    },
}
