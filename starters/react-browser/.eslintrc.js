const RULES_REACT = {
    'react/jsx-filename-extension': 'error',
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

        /* Tests */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: [
                'src/**/__mocks__/**/*.js?(x)',
                'src/**/__tests__/**/*.js?(x)',
                'src/**/?(*.)+(spec|test).js?(x)',
            ],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            plugins: ['jest'],
            rules: RULES_REACT,
        },
    ],
    settings: {
        react: {
            version: '18.2',
        },
    },
}
