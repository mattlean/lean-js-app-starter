const path = require('path')

module.exports = {
    PATH_COMMON_SRC: path.resolve(__dirname, 'src/common'),
    PATH_BUILD_DEV: path.resolve(__dirname, 'build/development'),
    PATH_BUILD_PROD: path.resolve(__dirname, 'build/production'),
    PATH_MAIN_BUILD_DEV: path.resolve(__dirname, 'build/development/main'),
    PATH_MAIN_BUILD_PROD: path.resolve(__dirname, 'build/production/main'),
    PATH_MAIN_SRC: path.resolve(__dirname, 'src/main'),
    PATH_PLAYWRIGHT_SRC: path.resolve(__dirname, 'src/playwright'),
    PATH_PRELOAD_BUILD_DEV: path.resolve(
        __dirname,
        'build/development/preload',
    ),
    PATH_PRELOAD_BUILD_PROD: path.resolve(
        __dirname,
        'build/production/preload',
    ),
    PATH_PRELOAD_SRC: path.resolve(__dirname, 'src/preload'),
    PATH_RENDERER_BUILD_DEV: path.resolve(
        __dirname,
        'build/development/renderer',
    ),
    PATH_RENDERER_BUILD_PROD: path.resolve(
        __dirname,
        'build/production/renderer',
    ),
    PATH_RENDERER_SRC: path.resolve(__dirname, 'src/renderer'),
    PATH_SRC: path.resolve(__dirname, 'src'),
}
