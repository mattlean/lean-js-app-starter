// @flow

const settings = {
  env: process.env.NODE_ENV,
  api: undefined
}

switch(process.env.NODE_ENV) {
  case 'test':
    settings.api = 'http://localhost:8080/api/'
    break
}

export default settings
