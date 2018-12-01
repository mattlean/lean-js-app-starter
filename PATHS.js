const path = require('path')

module.exports = {
  root: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  back: {
    build: path.join(__dirname, 'build/back'),
    src: path.join(__dirname, 'src/back')
  },
  front: {
    build: path.join(__dirname, 'build/front'),
    src: path.join(__dirname, 'src/front')
  }
}
