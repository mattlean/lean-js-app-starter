// @flow

const ServerErr = require('./ServerErr')

const err = {
  genErr(status?: number, message?: string) {
    if(!message) {
      switch(status) {
        case 404:
          message = 'Not found'
          break
        default:
          message = 'Error'
      }
    }

    return new ServerErr({ message, status })
  }
}

module.exports = err
