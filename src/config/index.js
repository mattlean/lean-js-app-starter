// @flow

let config = {
  PORT: 3000,
  DB_URI: 'mongodb://localhost/lean-web-app-db'
}

if(process.env.NODE_ENV) {
  config = {
    ...config,
    ...require(`./${process.env.NODE_ENV}`)
  }
}

module.exports = config
