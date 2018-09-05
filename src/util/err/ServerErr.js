// @flow

class ServerErr extends Error {
  message: string
  status: number

  constructor(...args: any) {
    super(args)

    if(typeof args[0] === 'object') {
      if(args[0].message) this.message = args[0].message
      if(args[0].status) this.status = args[0].status
    }
  }
}

module.exports = ServerErr
