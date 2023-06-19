exports.FORK_TS_CHECKER_DEFAULT_OPTIONS = {
    typescript: {
        configOverwrite: {
            exclude: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
        },
    },
}
