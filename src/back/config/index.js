// @flow

let config = {
  PORT: 3000,
  DB_URI: 'mongodb://localhost/starchan',
  CLIENT: null
}

if(process.env.NODE_ENV) {
  config = {
    ...config,
    ...require(`./${process.env.NODE_ENV}`).default
  }
}

export default config

export const DB_URI = config.DB_URI

export const CLIENT = config.CLIENT

export const PORT = config.PORT
