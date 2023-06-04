const RULES_REACT = {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
}

module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['build/'],
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
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['react', '@typescript-eslint'],
            rules: RULES_REACT,
        },

        /* Tests */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: ['src/**/*.test.[jt]s?(x)'],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:@typescript-eslint/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['react', '@typescript-eslint', 'jest'],
            rules: RULES_REACT,
        },
    ],
    settings: {
        react: {
            version: '18.2',
        },
    },
}
