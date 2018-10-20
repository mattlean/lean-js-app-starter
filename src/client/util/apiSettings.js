// @flow

const settings = {
  env: process.env.NODE_ENV,
  api: undefined
}

switch(process.env.NODE_ENV) {
  case 'test':
    settings.api = 'http://localhost:9001/api/'
    break
}

export default settings
