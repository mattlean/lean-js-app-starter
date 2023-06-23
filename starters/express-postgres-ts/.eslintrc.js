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
            files: ['src/**/*.[jt]s'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
        },

        /* Tests */
        {
            env: {
                es2021: true,
                jest: true,
                node: true,
            },
            files: [
                'prisma/singleton.ts',
                'src/**/__mocks__/**/*.[jt]s',
                'src/**/__tests__/**/*.[jt]s',
                'src/**/?(*.)+(spec|test).[jt]s',
            ],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:jest/recommended',
                'prettier',
            ],
            plugins: ['@typescript-eslint', 'jest'],
        },
    ],
}
