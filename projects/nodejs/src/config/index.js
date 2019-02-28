// @flow

let config = {
  PORT: 3000,
  DB_URI: 'mongodb://localhost/nodejs',
  CLIENT: null
}

if(process.env.NODE_ENV) {
  config = {
    ...config,
    ...require(`./${process.env.NODE_ENV}`)
  }
}

module.exports = config
