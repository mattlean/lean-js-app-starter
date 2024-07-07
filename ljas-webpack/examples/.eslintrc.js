module.exports = {
    env: {
        es2020: true,
        node: true,
        browser: true,
    },
    ignorePatterns: ['dist/'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react'],
    rules: {
        'react/jsx-uses-vars': 'error',
    },
}
