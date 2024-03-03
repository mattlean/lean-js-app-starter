const path = require('path')

module.exports = {
    PATH_BUILD: path.resolve(__dirname, 'build'),
    PATH_MAIN_BUILD: path.resolve(__dirname, 'build/main'),
    PATH_MAIN_SRC: path.resolve(__dirname, 'src/main'),
    PATH_PRELOAD_BUILD: path.resolve(__dirname, 'build/preload'),
    PATH_PRELOAD_SRC: path.resolve(__dirname, 'src/preload'),
    PATH_RENDERER_BUILD: path.resolve(__dirname, 'build/renderer'),
    PATH_RENDERER_SRC: path.resolve(__dirname, 'src/renderer'),
    PATH_SRC: path.resolve(__dirname, 'src'),
}
