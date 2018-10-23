const path = require('path')

module.exports = {
  root: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  main: {
    build: path.join(__dirname, 'build/main'),
    src: path.join(__dirname, 'src/main')
  },
  renderer: {
    build: path.join(__dirname, 'build/renderer'),
    src: path.join(__dirname, 'src/renderer')
  }
}
