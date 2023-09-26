exports.FORK_TS_CHECKER_DEFAULT_OPTIONS = {
    typescript: {
        configOverwrite: {
            exclude: [
                '**/__mocks__/**/*.ts',
                '**/__tests__/**/*.ts',
                '**/*.spec.ts',
                '**/*.test.ts',
            ],
        },
    },
}

exports.FORK_TS_CHECKER_DEFAULT_REACT_OPTIONS = {
    typescript: {
        configOverwrite: {
            exclude: [
                '**/__mocks__/**/*.ts?(x)',
                '**/__tests__/**/*.ts?(x)',
                '**/*.spec.ts?(x)',
                '**/*.test.ts?(x)',
            ],
        },
    },
}
