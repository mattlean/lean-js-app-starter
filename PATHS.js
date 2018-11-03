const path = require('path')

module.exports = {
  build: path.join(__dirname, 'build/production/webpack'),
  root: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  main: {
    build: path.join(__dirname, 'build/development/main'),
    src: path.join(__dirname, 'src/main')
  },
  renderer: {
    build: path.join(__dirname, 'build/development/renderer'),
    src: path.join(__dirname, 'src/renderer')
  }
}
