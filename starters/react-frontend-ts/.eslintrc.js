const RULES_REACT = { 'react/react-in-jsx-scope': 'off' }

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
    overrides: [
        /* Source */
        {
            env: {
                browser: true,
                es2021: true,
            },
            files: ['src/**/*.js'],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'prettier',
            ],
            plugins: ['react'],
            rules: RULES_REACT,
        },

        /* Tests */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: ['src/**/*.test.js'],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            plugins: ['react', 'jest'],
            rules: RULES_REACT,
        },
    ],
    settings: {
        react: {
            version: '18.2',
        },
    },
}
