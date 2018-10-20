const path = require('path')

module.exports = {
  root: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  client: {
    build: path.join(__dirname, 'build/client'),
    src: path.join(__dirname, 'src/client')
  },
  server: {
    build: path.join(__dirname, 'build/server'),
    src: path.join(__dirname, 'src/server')
  }
}
