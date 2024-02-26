/**
 * These options override the default tsconfig.json options to avoid typechecking
 * for certain files in the build process. This is because we don't want type errors
 * to cause the build processes to fail which can unnecessary hinder the development
 * server or production deployments.
 *
 * Because this only affects the build process, linting in other processes like
 * VS Code linting or pre-commit hooks will still behave correctly.
 *
 * For example: we want the development server to continue to build properly even
 * if there is a type error in a test file. However, Jest will still fail to run
 * the test and notify us of the type error. This prevents tests from interfering
 * with the local development application.
 */
module.exports = {
    include: ['src/**/*'],
    exclude: [
        'src/**/__mocks__',
        'src/**/__tests__',
        'src/**/*.spec.js',
        'src/**/*.spec.jsx',
        'src/**/*.spec.ts',
        'src/**/*.spec.tsx',
        'src/**/*.test.js',
        'src/**/*.test.jsx',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/common/msw/**/*',
        'src/backend/common/util/test.ts',
        'src/common/util/test.tsx',
    ],
}
